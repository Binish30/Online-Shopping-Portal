import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Pause, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
const response = await fetch(`${apiUrl}/api/banners/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch banners.');
                }
                const data = await response.json();
                setBanners(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    const handleBannerClick = (link) => {
        if (link) {
            navigate(link);
        }
    };

    if (loading) {
        return <div className="hero-placeholder">Loading banners....</div>;
    }

    if (error) {
        return <div className="hero-placeholder hero-error">{error}</div>;
    }

    return (
        <div className="hero-wrapper">
            <Carousel
                pause={false}
                interval={isPaused ? null : 2000}
            >
                {banners.map((banner, index) => (
                    <Carousel.Item
                        key={index}
                        onClick={() => handleBannerClick(banner.link)}
                        className={banner.link ? 'clickable-carousel-item' : ''}
                    >
                        <img
                            className="d-block w-100 hero-image"
                            src={banner.image}
                            alt={banner.title}
                        />
                        <Carousel.Caption>
                            <p>{banner.subtitle}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            <button
                className="carousel-pause-button"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Play carousel" : "Pause carousel"}
            >
                {isPaused ? <Play /> : <Pause />}
            </button>
        </div>
    );
}

export default Hero;    