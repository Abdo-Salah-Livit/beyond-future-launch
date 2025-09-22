import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple hardcoded authentication
    if (email === "admin@brs.com" && password === "password123") {
      login();
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password. Try admin@brs.com / password123");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-card shadow-elegant">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-card-foreground">
            BRS Admin Login
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to access the admin dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@brs.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-button shadow-button hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-xs text-muted-foreground">
            Demo credentials: admin@brs.com / password123
          </div>
        </CardContent>
      </Card>
    </div>
  );
}