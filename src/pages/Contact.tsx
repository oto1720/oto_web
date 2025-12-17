import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion'; //アニメーション効果を追加するライブラリ
import PageTransition from '../components/PageTransition'; //ページ遷移アニメーションのカスタムコンポーネント
import Scene from '../components/three/Scene'; 
import SpinningCube from '../components/three/SpinningCube'; 
import { Mail, Github, Twitter, Send, Link2 } from 'lucide-react'; //アイコンライブラリ
import emailjs from '@emailjs/browser';

//stateの管理
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

//入力フィールドの値が変更された時formDataを更新
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJSを使用してメールを送信
      const result = await emailjs.send(
        'YOUR_SERVICE_ID', // EmailJSのサービスID
        'YOUR_TEMPLATE_ID', // EmailJSのテンプレートID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Kotaro', // 受信者名
        },
        'YOUR_PUBLIC_KEY' // EmailJSの公開キー
      );
      
      if (result.status === 200) {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        throw new Error('EmailJS error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsSubmitting(false);
      alert('メッセージの送信に失敗しました。もう一度お試しください。');
    }
  };

  const socialLinks = [
    { name: 'Email', icon: <Mail size={24} />, url: 'mailto:kotaro17206@gmail.com' },
    { name: 'GitHub', icon: <Github size={24} />, url: 'https://github.com/oto1720' },
    { name: 'Qiita', icon: <Link2 size={24} />, url: 'https://qiita.com/oto1720' },
    { name: 'Twitter', icon: <Twitter size={24} />, url: 'https://x.com/ot6217' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen relative">
        {/* Background 3D Scene */}
        <div className="fixed inset-0 z-0">
          <Scene cameraPosition={[0, 0, 5]} controls={false}>
            <SpinningCube position={[-3, -1, -3]} size={0.8} color="#ffffff" wireframe={true} speed={0.1} />
            <SpinningCube position={[3, 1, -2]} size={0.6} color="#ffffff" wireframe={true} speed={0.2} />
          </Scene>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Contact</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Social Links */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-lg p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Connect With Me</h2>
              
              <div className="space-y-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
                      {link.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{link.name}</h3>
                      <p className="text-sm text-white/70">
                        {link.name === 'Email' ? 'kotaro17206@gmail.com' : link.url}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-lg p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
              
              <form 
                ref={formRef} 
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 resize-none"
                    placeholder="Your message"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className={`w-full px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
                    submitted 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-white text-black hover:bg-white/90'
                  }`}
                  disabled={isSubmitting || submitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-black\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                        <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : submitted ? (
                    <span className="flex items-center gap-2">
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} />
                      Send Message
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;