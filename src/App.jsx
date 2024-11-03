import React, { useState, useEffect } from 'react';
import { Loader, Dumbbell, Plus, Minus, Mail, Lock, User, LogOut } from 'lucide-react';

const RMCalculator = () => {
  const [screen, setScreen] = useState('splash');
  const [weight, setWeight] = useState(60);
  const [reps, setReps] = useState(8);
  const [results, setResults] = useState({});
  
  // Splash screen timer
  useEffect(() => {
    if (screen === 'splash') {
      const timer = setTimeout(() => setScreen('login'), 2000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Brzycki formula calculation
  const calculateRM = (weight, reps) => {
    const oneRM = weight * (36 / (37 - reps));
    const results = {};
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15].forEach(rep => {
      results[rep] = Math.round(oneRM * (37 - rep) / 36);
    });
    return results;
  };

  // Weight and reps handlers
  const incrementWeight = () => setWeight(prev => prev + 5);
  const decrementWeight = () => setWeight(prev => prev > 5 ? prev - 5 : prev);
  const incrementReps = () => setReps(prev => prev < 15 ? prev + 1 : prev);
  const decrementReps = () => setReps(prev => prev > 1 ? prev - 1 : prev);

  // Screen components
  const SplashScreen = () => (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Loader className="w-12 h-12 text-red-500 animate-spin" />
      <h1 className="text-2xl font-bold text-white">RM Calculator</h1>
    </div>
  );

  const LoginScreen = () => (
    <div className="flex flex-col items-center justify-center h-screen p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Login</h2>
      <div className="w-full space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 pl-12 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-red-500 focus:outline-none"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 pl-12 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-red-500 focus:outline-none"
          />
        </div>
        <a href="#" className="block text-sm text-red-500 hover:text-red-400">Esqueceu a senha?</a>
        <button
          onClick={() => setScreen('calculator')}
          className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Acessar
        </button>
        <button
          onClick={() => setScreen('register')}
          className="w-full text-sm text-gray-400 hover:text-white"
        >
          Não tem conta? Cadastre-se
        </button>
      </div>
    </div>
  );

  const RegisterScreen = () => (
    <div className="flex flex-col items-center justify-center h-screen p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Cadastro</h2>
      <div className="w-full space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Nome completo"
            className="w-full p-3 pl-12 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-red-500 focus:outline-none"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 pl-12 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-red-500 focus:outline-none"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 pl-12 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-red-500 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setScreen('login')}
          className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Cadastrar
        </button>
        <button
          onClick={() => setScreen('login')}
          className="w-full text-sm text-gray-400 hover:text-white"
        >
          Já tem conta? Faça login
        </button>
      </div>
    </div>
  );

  const CalculatorScreen = () => (
    <div className="flex flex-col h-screen">
      <nav className="flex items-center justify-between p-4 bg-gray-900">
        <div className="flex items-center space-x-2">
          <Dumbbell className="w-6 h-6 text-red-500" />
          <span className="text-lg font-bold text-white">RM Calculator</span>
        </div>
        <button
          onClick={() => {
            setScreen('login');
            setWeight(60);
            setReps(8);
            setResults({});
          }}
          className="p-2 text-gray-400 hover:text-white"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </nav>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-gray-400">Peso (kg)</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={decrementWeight}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Minus className="w-5 h-5 text-red-500" />
              </button>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full p-3 bg-gray-800 rounded-lg text-white text-center border border-gray-700 focus:border-red-500 focus:outline-none"
              />
              <button
                onClick={incrementWeight}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Plus className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-400">Repetições</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={decrementReps}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Minus className="w-5 h-5 text-red-500" />
              </button>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                className="w-full p-3 bg-gray-800 rounded-lg text-white text-center border border-gray-700 focus:border-red-500 focus:outline-none"
              />
              <button
                onClick={incrementReps}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Plus className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>

          <button
            onClick={() => setResults(calculateRM(weight, reps))}
            className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Calcular
          </button>
        </div>

        {Object.keys(results).length > 0 && (
          <div className="space-y-4">
            <div className="p-4 bg-red-500 rounded-lg">
              <div className="text-sm text-white opacity-75">1RM (Máximo)</div>
              <div className="text-2xl font-bold text-white">{results[1]}kg</div>
            </div>

            <div className="text-sm text-gray-400">Fórmula de Brzycki</div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(results).slice(1).map(([reps, weight]) => (
                <div key={reps} className="p-4 bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-400">{reps}RM</div>
                  <div className="text-xl font-bold text-white">{weight}kg</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Screen renderer
  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'calculator':
        return <CalculatorScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen max-w-md mx-auto">
      {renderScreen()}
    </div>
  );
};

export default RMCalculator;