import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut } from "lucide-react";
import logoImage from "@assets/bmc_1749151545858.jpg";

export default function Footer() {
  const [location] = useLocation();
  const { isAuthenticated, user } = useAuth();

  return (
    <footer className="bg-gradient-to-r from-orange-50/95 via-red-50/95 to-pink-50/95 backdrop-blur-sm shadow-lg border-t border-orange-200/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Section */}
        <div className="py-4 flex justify-between items-center">
          <Link href="/">
            <img 
              src={logoImage}
              alt="Balanced Method Coaching" 
              className="h-12 w-auto object-contain mix-blend-multiply"
            />
          </Link>
          
          <div className="flex space-x-4">
            <Link href="/">
              <Button 
                variant={location === "/" ? "default" : "ghost"}
                className={location === "/" ? "bg-primary text-primary-foreground" : ""}
              >
                Home
              </Button>
            </Link>
            
            <Button 
              variant={location === "/about" ? "default" : "ghost"}
              className={location === "/about" ? "bg-primary text-primary-foreground" : ""}
              onClick={() => {
                if (location === "/about") {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.location.href = "/about";
                }
              }}
            >
              About Me
            </Button>
            
            <Button 
              variant={location === "/coaching-offers" ? "default" : "ghost"}
              className={location === "/coaching-offers" ? "bg-primary text-primary-foreground" : ""}
              onClick={() => {
                if (location === "/coaching-offers") {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.location.href = "/coaching-offers";
                }
              }}
            >Coaching Offers</Button>

            {/* Course access for authenticated users */}
            {isAuthenticated && (user as any)?.hasCourseAccess && (
              <Link href="/course">
                <Button 
                  variant={location === "/course" ? "default" : "ghost"}
                  className={location === "/course" ? "bg-primary text-primary-foreground" : ""}
                >My Course</Button>
              </Link>
            )}

            {/* Authentication buttons */}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/api/logout'}
                className="flex items-center gap-1 ml-6"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/api/login'}
                className="flex items-center gap-1 ml-6"
              >
                <User className="w-4 h-4" />
                Login
              </Button>
            )}
            
            {/* Social Media Quick Access */}
            <div className="flex items-center gap-2 ml-4">
              <a
                href="https://www.youtube.com/channel/UCBT1Ybx3SnpA0gW0jeLxpLg"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="YouTube Channel"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/itscoachmark?igsh=MTJ3eTJpa3U5OTc0cw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                title="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-orange-200/30 py-4 text-center">
          <p className="text-gray-600/80">© 2025 Balanced Method Coaching. All rights reserved. | B.S., CSCS, Pn1 Coach</p>
        </div>
      </div>
    </footer>
  );
}