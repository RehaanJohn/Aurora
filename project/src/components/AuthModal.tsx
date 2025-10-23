import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { X, Chrome } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-[400px] bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] text-white text-2xl">
              Welcome to Aurora
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-white/10"
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>

          <p className="[font-family:'Lato',Helvetica] text-white/60 text-sm mb-8 text-center">
            Sign in to join communities, chat with friends, and explore the decentralized web.
          </p>

          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-12 bg-white hover:bg-white/90 text-slate-900 font-medium rounded-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Chrome className="h-5 w-5" />
            <span className="[font-family:'Lato',Helvetica]">
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </span>
          </Button>

          <p className="[font-family:'Lato',Helvetica] text-white/40 text-xs text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
