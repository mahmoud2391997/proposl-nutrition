import React, { useState } from 'react';
import { ViewState } from './types';
import MealPlanner from './components/MealPlanner';
import Coaching from './components/Coaching';
import Blog from './components/Blog';
import { Menu, X, Utensils, Leaf, Users, BookOpen, ArrowRight, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: ViewState.HOME, icon: Leaf },
    { label: 'Meal Planner', view: ViewState.MEAL_PLANNER, icon: Utensils },
    { label: 'Coaching', view: ViewState.COACHING, icon: Users },
    { label: 'Blog', view: ViewState.BLOG, icon: BookOpen },
  ];

  const renderView = () => {
    switch (view) {
      case ViewState.MEAL_PLANNER:
        return <MealPlanner />;
      case ViewState.COACHING:
        return <Coaching />;
      case ViewState.BLOG:
        return <Blog />;
      case ViewState.HOME:
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer gap-2" 
              onClick={() => setView(ViewState.HOME)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center text-white">
                <Leaf size={20} fill="currentColor" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">NutriFlow</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <button
                  key={item.label}
                  onClick={() => setView(item.view)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    view === item.view ? 'text-emerald-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => setView(ViewState.MEAL_PLANNER)}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 p-2">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map(item => (
                <button
                  key={item.label}
                  onClick={() => {
                    setView(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                     view === item.view ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-white">
              <Leaf size={14} fill="currentColor" />
            </div>
            <span className="font-bold text-lg text-slate-900">NutriFlow</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} NutriFlow. All rights reserved.
          </p>
          <div className="flex gap-6 text-slate-500 text-sm">
            <span className="cursor-pointer hover:text-emerald-600">Privacy</span>
            <span className="cursor-pointer hover:text-emerald-600">Terms</span>
            <span className="cursor-pointer hover:text-emerald-600">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Home Component specialized for the Landing Page
const Home: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0">
           <img 
            src="https://picsum.photos/1600/900?grayscale" 
            className="w-full h-full object-cover opacity-20" 
            alt="Background" 
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AI-Powered Nutrition
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Eat Smarter.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Live Better.
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Get personalized meal plans generated by Gemini AI, consult with top-tier nutritionists, and learn the science behind a healthy lifestyle.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setView(ViewState.MEAL_PLANNER)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                Generate Plan <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => setView(ViewState.COACHING)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold border border-white/10 transition-all"
              >
                Find a Coach
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div 
              className="group p-8 rounded-3xl bg-slate-50 hover:bg-emerald-50 transition-colors cursor-pointer"
              onClick={() => setView(ViewState.MEAL_PLANNER)}
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Utensils className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Meal Planning</h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                Input your goals, dietary restrictions, and body metrics. Our AI builds a perfectly balanced weekly menu instantly.
              </p>
              <span className="text-emerald-600 font-medium flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
                Try Planner <ChevronRight size={16} />
              </span>
            </div>

            <div 
              className="group p-8 rounded-3xl bg-slate-50 hover:bg-blue-50 transition-colors cursor-pointer"
              onClick={() => setView(ViewState.COACHING)}
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Coaching</h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                Need accountability? Book 1-on-1 video sessions with certified nutritionists and dietitians.
              </p>
              <span className="text-blue-600 font-medium flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
                Book Session <ChevronRight size={16} />
              </span>
            </div>

            <div 
              className="group p-8 rounded-3xl bg-slate-50 hover:bg-purple-50 transition-colors cursor-pointer"
              onClick={() => setView(ViewState.BLOG)}
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Knowledge Hub</h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                Access a library of AI-curated articles on the latest nutrition trends, backed by science.
              </p>
              <span className="text-purple-600 font-medium flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
                Read Articles <ChevronRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-emerald-900 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Your Journey Today</h2>
          <p className="text-emerald-200 text-lg mb-8">
            Join thousands of users who have transformed their health with NutriFlows personalized approach.
          </p>
          <button 
             onClick={() => setView(ViewState.MEAL_PLANNER)}
             className="bg-white text-emerald-900 px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
          >
            Generate Free Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;