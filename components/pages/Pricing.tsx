import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Zap } from 'lucide-react';
import Button from '../ui/Button';

const plans = [
    {
        name: 'Starter',
        price: 0,
        desc: 'Perfect for exploring',
        features: ['Access to 5 free courses', 'Community Support', 'Mobile Access', 'Limited Resources'],
        color: 'bg-white dark:bg-zinc-900',
        icon: Star
    },
    {
        name: 'Pro',
        price: 29,
        desc: 'For serious learners',
        features: ['Unlimited Course Access', 'Certificates of Completion', 'Offline Downloads', 'Priority Support', 'Project Reviews'],
        color: 'bg-piku-lime dark:bg-piku-purple',
        popular: true,
        icon: Zap
    },
    {
        name: 'Team',
        price: 99,
        desc: 'For small teams',
        features: ['5 Pro Accounts', 'Team Analytics Dashboard', 'SSO Integration', 'Dedicated Success Manager', 'Custom Learning Paths'],
        color: 'bg-white dark:bg-zinc-900',
        icon: Star
    }
];

const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="pt-32 pb-20 bg-piku-cream dark:bg-black min-h-screen transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block bg-white dark:bg-zinc-900 dark:text-white border-2 border-black dark:border-white px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
                Invest in Yourself
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic mb-6 leading-tight text-black dark:text-white">Simple, Transparent <br/><span className="text-piku-purple dark:text-piku-lime">Pricing</span></h1>
            <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 mb-10 px-4">Start for free, upgrade when you love it. No hidden fees.</p>
            
            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 md:gap-6 bg-white dark:bg-zinc-900 w-fit mx-auto px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] scale-90 md:scale-100">
                <span className={`font-bold text-base md:text-lg ${!annual ? 'text-black dark:text-white' : 'text-gray-400'}`}>Monthly</span>
                <button 
                    onClick={() => setAnnual(!annual)}
                    className="w-20 h-10 bg-black dark:bg-white rounded-full p-1 relative transition-colors border-2 border-black dark:border-white"
                >
                    <motion.div 
                        animate={{ x: annual ? 40 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-8 h-8 bg-piku-lime dark:bg-piku-purple rounded-full border-2 border-black dark:border-black"
                    />
                </button>
                <span className={`font-bold text-base md:text-lg flex items-center gap-2 ${annual ? 'text-black dark:text-white' : 'text-gray-400'}`}>
                    Yearly <span className="text-[10px] md:text-xs bg-piku-cyan dark:bg-piku-cyan text-black px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-black shadow-sm">-20%</span>
                </span>
            </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center mb-24">
            {plans.map((plan, i) => (
                <motion.div 
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ 
                        y: -15, 
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 300 } 
                    }}
                    className={`relative rounded-[2rem] md:rounded-[2.5rem] border-4 border-black dark:border-white p-6 md:p-8 flex flex-col h-full ${plan.color} ${plan.popular ? 'shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] md:-mt-8 md:mb-8 z-10 min-h-[550px] md:min-h-[600px]' : 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] min-h-[500px]'}`}
                >
                    {plan.popular && (
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-xl font-black text-sm uppercase tracking-wider border-4 border-piku-cyan shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] flex items-center gap-2 transform rotate-2 z-20 whitespace-nowrap"
                        >
                            <Star size={16} fill="currentColor" /> Best Value
                        </motion.div>
                    )}
                    
                    <div className="mb-6 flex justify-between items-start">
                        <div>
                             <h3 className={`text-3xl font-black mb-1 ${plan.popular ? 'text-black' : 'text-black dark:text-white'}`}>{plan.name}</h3>
                             <p className={`font-bold text-sm ${plan.popular ? 'text-black/70' : 'text-gray-500 dark:text-gray-400'}`}>{plan.desc}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-black ${plan.popular ? 'bg-black text-white' : 'bg-black dark:bg-white text-white dark:text-black'}`}>
                            <plan.icon size={24} />
                        </div>
                    </div>
                    
                    <div className={`mb-8 pb-8 border-b-2 ${plan.popular ? 'border-black/10' : 'border-black/10 dark:border-white/10'}`}>
                        <div className="flex items-baseline">
                            <span className={`text-5xl md:text-6xl font-black tracking-tighter ${plan.popular ? 'text-black' : 'text-black dark:text-white'}`}>${annual ? plan.price * 10 : plan.price}</span>
                            <span className={`font-bold ml-2 ${plan.popular ? 'text-black/60' : 'text-gray-500 dark:text-gray-400'}`}>/{annual ? 'yr' : 'mo'}</span>
                        </div>
                        {annual && plan.price > 0 && (
                            <div className="text-xs font-bold text-green-700 bg-green-100 border border-green-200 mt-2 w-fit px-2 py-1 rounded">Save ${(plan.price * 12) - (plan.price * 10)} per year</div>
                        )}
                    </div>

                    <div className="space-y-4 mb-8 flex-1">
                        {plan.features.map(f => (
                            <div key={f} className="flex items-start gap-3">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border-2 border-black ${plan.popular ? 'bg-black text-white' : 'bg-gray-200 dark:bg-zinc-800 text-gray-500 dark:text-gray-300'}`}>
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <span className={`font-bold text-sm leading-tight pt-1 ${plan.popular ? 'text-black' : 'text-gray-700 dark:text-gray-300'}`}>{f}</span>
                            </div>
                        ))}
                    </div>

                    <Button variant={plan.popular ? 'dark' : 'outline'} className={`w-full text-lg border-2 ${!plan.popular ? 'dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black' : ''}`} size="lg">
                        Choose {plan.name}
                    </Button>
                </motion.div>
            ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-[2rem] md:rounded-[3rem] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.5)] p-6 md:p-12 overflow-hidden">
             <h3 className="text-2xl md:text-3xl font-black mb-8 text-center text-black dark:text-white">Compare Features</h3>
             <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
                 <table className="w-full text-left min-w-[600px]">
                     <thead>
                         <tr className="border-b-4 border-black dark:border-white">
                             <th className="py-4 pl-4 font-black text-lg md:text-xl text-black dark:text-white">Feature</th>
                             <th className="py-4 text-center font-bold text-gray-500 dark:text-gray-400">Starter</th>
                             <th className="py-4 text-center font-black text-base md:text-lg bg-piku-lime/20 dark:bg-piku-purple/20 rounded-t-xl text-black dark:text-white">Pro</th>
                             <th className="py-4 text-center font-bold text-gray-500 dark:text-gray-400">Team</th>
                         </tr>
                     </thead>
                     <tbody>
                         {[
                             ['Course Access', '5 Courses', 'Unlimited', 'Unlimited'],
                             ['Certificates', <X size={20} className="mx-auto opacity-30 dark:text-white"/>, <Check size={24} strokeWidth={3} className="mx-auto text-green-600 dark:text-piku-lime"/>, <Check size={24} strokeWidth={3} className="mx-auto text-green-600 dark:text-piku-lime"/>],
                             ['Offline Mode', <X size={20} className="mx-auto opacity-30 dark:text-white"/>, <Check size={24} strokeWidth={3} className="mx-auto text-green-600 dark:text-piku-lime"/>, <Check size={24} strokeWidth={3} className="mx-auto text-green-600 dark:text-piku-lime"/>],
                             ['Mentor Chat', 'Community Only', 'Priority', 'Dedicated'],
                             ['Team Analytics', <X size={20} className="mx-auto opacity-30 dark:text-white"/>, <X size={20} className="mx-auto opacity-30 dark:text-white"/>, <Check size={24} strokeWidth={3} className="mx-auto text-green-600 dark:text-piku-lime"/>],
                         ].map(([feature, start, pro, team], idx) => (
                             <tr key={idx} className="border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-black dark:text-white">
                                 <td className="py-4 pl-4 font-bold text-sm md:text-base">{feature}</td>
                                 <td className="py-4 text-center font-medium text-sm md:text-base">{start}</td>
                                 <td className="py-4 text-center font-bold bg-piku-lime/10 dark:bg-piku-purple/10 text-sm md:text-base">{pro}</td>
                                 <td className="py-4 text-center font-medium text-sm md:text-base">{team}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;