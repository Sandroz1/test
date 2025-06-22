import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, memo } from 'react';

const ParticleBackground: React.FC = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const container = document.getElementById('welcome-container');

        if (!canvas || !ctx || !container) return;

        let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.scale(dpr, dpr);
        };
        
        const createParticles = () => {
            const numParticles = 100;
            particles = [];
            const { width, height } = canvas.getBoundingClientRect();
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.1,
                    vy: (Math.random() - 0.5) * 0.1,
                    radius: Math.random() * 1.2 + 0.5,
                });
            }
        };

        const animate = () => {
            const { width, height } = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fill();
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            setCanvasSize();
            createParticles();
        };

        setCanvasSize();
        createParticles();
        animate();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
            }}
        />
    );
});

interface WelcomeScreenProps {
    onClose: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onClose }) => {
    return (
        <motion.div
            id="welcome-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                overflow: 'hidden',
            }}
        >
            <ParticleBackground />
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
            >
                <Box
                    textAlign="center"
                    sx={{
                        p: 4,
                    }}
                >
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Typography
                            variant="h1"
                            fontWeight="bold"
                            sx={{
                                color: '#E0E0E0',
                                mb: 2,
                                fontSize: { xs: '2.5rem', md: '4rem' },
                                textShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            Добро пожаловать, Алексей!
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#B0B0B0',
                                mb: 4,
                                fontSize: { xs: '1rem', md: '1.5rem' },
                            }}
                        >
                            Управляйте пользователями с легкостью и удовольствием!
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={onClose}
                            sx={{
                                mt: 2,
                                px: 8,
                                py: 2,
                                borderRadius: 50,
                                color: 'white',
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                '&:hover': {
                                    boxShadow: '0 5px 8px 3px rgba(33, 203, 243, .4)',
                                },
                            }}
                        >
                            Начать работу
                        </Button>
                    </motion.div>
                </Box>
            </motion.div>
        </motion.div>
    );
};

export default WelcomeScreen;

