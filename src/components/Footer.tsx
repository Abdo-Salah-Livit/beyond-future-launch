import { Link } from "react-router-dom";
import { Home, Info, BookOpen, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Programs", href: "/programs", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">
            Beyond Reality <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">School</span>
          </h3>
          
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-8">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <Link 
                      to={link.href} 
                      className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300 group"
                    >
                      <Icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-2 text-white/40 hover:text-white/70 transition-colors duration-300 text-sm"
                >
                  <span>Admin</span>
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/60">
              © {currentYear} Beyond Reality School. All rights reserved. 
              <span className="block mt-2 text-sm">Empowering the next generation of innovators.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;