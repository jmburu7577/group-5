'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { SplitSquareHorizontal } from 'lucide-react';
import { Button } from './button';
import { useComparison } from '@/contexts/ComparisonContext';

interface CompareButtonProps {
  productId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const CompareButton: React.FC<CompareButtonProps> = ({
  productId,
  variant = 'ghost',
  size = 'sm',
  showText = false,
  className
}) => {
  const { addToComparison, removeFromComparison, isInComparison, comparisonCount, maxItems } = useComparison();
  const inComparison = isInComparison(productId);
  const isDisabled = !inComparison && comparisonCount >= maxItems;

  const handleToggleComparison = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inComparison) {
      removeFromComparison(productId);
    } else if (!isDisabled) {
      addToComparison(productId);
    }
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <Button
      variant={variant}
      onClick={handleToggleComparison}
      disabled={isDisabled && !inComparison}
      className={cn(
        'rounded-full transition-all',
        inComparison ? 'hover:bg-blue-50' : isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50',
        className
      )}
      aria-label={inComparison ? 'Remove from comparison' : isDisabled ? 'Comparison limit reached' : 'Add to comparison'}
    >
      <SplitSquareHorizontal
        className={cn(
          iconSizes[size],
          inComparison ? 'fill-blue-500 text-blue-500' : 'text-gray-400'
        )}
      />
      {showText && (
        <span className={cn("ml-2", inComparison ? "text-blue-500" : "text-gray-600")}>
          {inComparison ? 'Remove from Compare' : isDisabled ? 'Compare Full' : 'Add to Compare'}
        </span>
      )}
    </Button>
  );
};

interface ComparisonCounterProps {
  className?: string;
}

export const ComparisonCounter: React.FC<ComparisonCounterProps> = ({ className }) => {
  const { comparisonCount } = useComparison();

  if (comparisonCount === 0) return null;

  return (
    <span className={cn(
      "inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full",
      className
    )}>
      {comparisonCount}
    </span>
  );
};