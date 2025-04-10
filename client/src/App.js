import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [sorteos, setSorteos] = useState({
    2255: { boletos: [], ganador: null, serie: 1, valorPremio: 150000000, valorBillete: 10000 },
    3748: { boletos: [], ganador: null, serie: 2, valorPremio: 150000000, valorBillete: 10000 },
    4567: { boletos: [], ganador: null, serie: 3, valorPremio: 150000000, valorBillete: 10000 }
  });
  const [resultados, setResultados] = useState({});
  const [fechaEmision] = useState(new Date('2025-06-12'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const inicializarSorteos = async () => {
      try {
        setLoading(true);

        // Intentar borrar boletos existentes
        try {
          await axios.delete('http://localhost:5000/api/boletos');
        } catch (err) {
          console.log('No se pudieron borrar boletos anteriores o no había ninguno');
        }

        // Crear un nuevo estado inicial para los sorteos
        const nuevosSorteos = {
          2255: { boletos: [], ganador: null, serie: 1, valorPremio: 150000000, valorBillete: 10000 },
          3748: { boletos: [], ganador: null, serie: 2, valorPremio: 150000000, valorBillete: 10000 },
          4567: { boletos: [], ganador: null, serie: 3, valorPremio: 150000000, valorBillete: 10000 }
        };

        // Generar boletos aleatorios y guardarlos en la base de datos
        for (const numeroSorteo of Object.keys(nuevosSorteos)) {
          const boletosGenerados = new Set();
          while (boletosGenerados.size < 10) {
            boletosGenerados.add(Math.floor(1000 + Math.random() * 9000));
          }

          nuevosSorteos[numeroSorteo].boletos = [...boletosGenerados];

          for (const numeroBoleto of nuevosSorteos[numeroSorteo].boletos) {
            try {
              await axios.post('http://localhost:5000/api/boletos', {
                numeroBoleto,
                numeroSorteo: parseInt(numeroSorteo),
                valorPremio: nuevosSorteos[numeroSorteo].valorPremio,
                fechaEmision,
                numeroSerie: nuevosSorteos[numeroSorteo].serie,
                valorBillete: nuevosSorteos[numeroSorteo].valorBillete
              });
            } catch (err) {
              console.error(`Error al guardar boleto ${numeroBoleto} para sorteo ${numeroSorteo}:`, err);
            }
          }
        }

        setSorteos(nuevosSorteos);
        setLoading(false);
      } catch (err) {
        console.error('Error al inicializar sorteos:', err);
        setError('Error al conectar con el servidor. Verifica que el backend esté en ejecución.');
        setLoading(false);
      }
    };

    inicializarSorteos();
  }, [fechaEmision]); // Agrega 'fechaEmision' como dependencia

  // Realizar sorteo
  const realizarSorteo = () => {
    const nuevosResultados = {};
    const ganadoresPorNumero = {};

    Object.keys(sorteos).forEach(numeroSorteo => {
      const { boletos } = sorteos[numeroSorteo];
      // Seleccionar un ganador aleatorio entre los 10 boletos
      const indiceGanador = Math.floor(Math.random() * boletos.length);
      const numeroGanador = boletos[indiceGanador];

      // Actualizar resultados
      nuevosResultados[numeroSorteo] = {
        ganador: numeroGanador,
        todosLosNumeros: [...boletos]
      };

      // Contabilizar ganadores
      if (ganadoresPorNumero[numeroGanador]) {
        ganadoresPorNumero[numeroGanador].push(parseInt(numeroSorteo));
      } else {
        ganadoresPorNumero[numeroGanador] = [parseInt(numeroSorteo)];
      }
    });

    // Calcular premios divididos
    Object.keys(ganadoresPorNumero).forEach(numeroGanador => {
      const sorteosGanados = ganadoresPorNumero[numeroGanador];
      if (sorteosGanados.length > 1) {
        // Si ganó en múltiples sorteos, dividir el premio
        const premioPorSorteo = 150000000 / sorteosGanados.length;
        sorteosGanados.forEach(numeroSorteo => {
          nuevosResultados[numeroSorteo].premioAjustado = premioPorSorteo;
        });
      } else {
        nuevosResultados[sorteosGanados[0]].premioAjustado = 150000000;
      }
    });

    setResultados(nuevosResultados);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h2>Cargando sorteos...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="boton-reintentar">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Juego del Chance</h1>
        <p>Fecha de emisión: {fechaEmision.toLocaleDateString()}</p>
      </header>

      <main>
        <button className="boton-sorteo" onClick={realizarSorteo}>
          Realizar Sorteo
        </button>

        <div className="sorteos-container">
          {Object.keys(sorteos).map(numeroSorteo => (
            <div key={numeroSorteo} className="sorteo-card">
              <h2>Sorteo #{numeroSorteo}</h2>
              <p>Serie: {sorteos[numeroSorteo].serie}</p>
              <p>Valor del billete: ${sorteos[numeroSorteo].valorBillete.toLocaleString()}</p>

              {resultados[numeroSorteo] ? (
                <>
                  <div className="ganador">
                    <h3>Número Ganador: {resultados[numeroSorteo].ganador}</h3>
                    <p className="premio">
                      Premio: ${resultados[numeroSorteo].premioAjustado?.toLocaleString() || sorteos[numeroSorteo].valorPremio.toLocaleString()}
                    </p>
                    {resultados[numeroSorteo].premioAjustado !== sorteos[numeroSorteo].valorPremio && (
                      <p className="nota">*Premio dividido por múltiples ganadores</p>
                    )}
                  </div>

                  <div className="todos-numeros">
                    <h4>Todos los números del sorteo:</h4>
                    <div className="numeros-grid">
                      {resultados[numeroSorteo].todosLosNumeros.map(numero => (
                        <span 
                          key={numero} 
                          className={numero === resultados[numeroSorteo].ganador ? 'numero ganador' : 'numero'}
                        >
                          {numero}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p>Esperando resultado del sorteo...</p>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="App-footer">
        <p>Aplicación del Juego del Chance - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;