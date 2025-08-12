'use client';

import React from 'react';
import { Button } from './button';
import { useComparison } from '@/contexts/ComparisonContext';

interface ComparisonButtonProps {
    productId: string;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    className?: string;
}

export const ComparisonButton: React.FC<ComparisonButtonProps> = ({
    productId,
    variant = 'outline',
    size = 'md',
    showText = false,
    className = ''
}) => {
    const {
        addToComparison,
        removeFromComparison,
        isInComparison,
        canAddMore,
        comparisonCount,
        maxItems
    } = useComparison();

    const inComparison = isInComparison(productId);

    const handleToggleComparison = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if button is inside a link
        e.stopPropagation(); // Prevent event bubbling

        if (inComparison) {
            removeFromComparison(productId);
        } else if (canAddMore) {
            addToComparison(productId);
        }
    };

    const isDisabled = !inComparison && !canAddMore;

    const getButtonText = () => {
        if (inComparison) {
            return showText ? 'Remove from Compare' : '⚖️';
        } else if (canAddMore) {
            return showText ? 'Add to Compare' : '⚖️';
        } else {
            return showText ? `Max ${maxItems} items` : '⚖️';
        }
    };

    const getAriaLabel = () => {
        if (inComparison) {
            return 'Remove from comparison';
        } else if (canAddMore) {
            return 'Add to comparison';
        } else {
            return `Maximum ${maxItems} items can be compared`;
        }
    };

    const getTitle = () => {
        if (inComparison) {
            return 'Remove from comparison';
        } else if (canAddMore) {
            return `Add to comparison (${comparisonCount}/${maxItems})`;
        } else {
            return `Maximum ${maxItems} items can be compared`;
        }
    };

    return (
        <Button
            variant={inComparison ? 'default' : variant}
            size={size}
            onClick={handleToggleComparison}
            disabled={isDisabled}
            className={`${className} transition-all duration-200 ${inComparison ? 'bg-blue-600 text-white hover:bg-blue-700' : ''
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            aria-label={getAriaLabel()}
            title={getTitle()}
        >
            {getButtonText()}
        </Button>
    );
};

interface ComparisonCounterProps {
    className?: string;
}

export const ComparisonCounter: React.FC<ComparisonCounterProps> = ({ className = '' }) => {
    const { comparisonCount } = useComparison();

    if (comparisonCount === 0) return null;

    return (
        <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full ${className}`}>
            {comparisonCount}
        </span>
    );
};