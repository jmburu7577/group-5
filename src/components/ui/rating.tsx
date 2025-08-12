import React from 'react';
import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
    rating: number;
    totalReviews?: number;
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    className?: string;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({
    rating,
    totalReviews,
    size = 'md',
    showText = true,
    className
  }, ref) => {
    const sizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    const starSizeClass = {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star 
                  key={`full-${i}`} 
                  className={cn("fill-yellow-400 text-yellow-400", starSizeClass[size])}
                />
            );
        }

        // Half star
        if (hasHalfStar) {
            stars.push(
                <StarHalf 
                  key="half" 
                  className={cn("fill-yellow-400 text-yellow-400", starSizeClass[size])}
                />
            );
        }

        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star 
                  key={`empty-${i}`} 
                  className={cn("text-gray-300", starSizeClass[size])}
                />
            );
        }

        return stars;
    };

    return (
        <div ref={ref} className={cn("flex items-center", className)}>
            <div className="flex items-center mr-2">
                {renderStars()}
            </div>
            {showText && totalReviews !== undefined && (
                <span className={cn("text-gray-500", sizeClasses[size])}>
                    ({totalReviews})
                </span>
            )}
        </div>
    );
});

Rating.displayName = "Rating";

interface InteractiveRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const InteractiveRating: React.FC<InteractiveRatingProps> = ({
    rating,
    onRatingChange,
    size = 'md',
    className = ''
}) => {
    const [hoverRating, setHoverRating] = React.useState(0);

    const starSize = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl'
    };

    const handleStarClick = (starRating: number) => {
        onRatingChange(starRating);
    };

    const handleStarHover = (starRating: number) => {
        setHoverRating(starRating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className={`flex items-center gap-1 ${className}`} onMouseLeave={handleMouseLeave}>
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`${starSize[size]} transition-colors hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                >
                    <span
                        className={
                            star <= (hoverRating || rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                        }
                    >
                        ⭐
                    </span>
                </button>
            ))}
        </div>
    );
};