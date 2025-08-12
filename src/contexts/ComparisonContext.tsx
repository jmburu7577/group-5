'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/data';

interface ComparisonContextType {
    comparisonItems: string[];
    addToComparison: (productId: string) => void;
    removeFromComparison: (productId: string) => void;
    isInComparison: (productId: string) => boolean;
    clearComparison: () => void;
    comparisonCount: number;
    maxItems: number;
    canAddMore: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
    const context = useContext(ComparisonContext);
    if (!context) {
        throw new Error('useComparison must be used within a ComparisonProvider');
    }
    return context;
};

interface ComparisonProviderProps {
    children: React.ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
    const [comparisonItems, setComparisonItems] = useState<string[]>([]);
    const maxItems = 4; // Maximum number of items that can be compared

    // Load comparison items from localStorage on mount
    useEffect(() => {
        const savedComparison = localStorage.getItem('handcrafted-haven-comparison');
        if (savedComparison) {
            try {
                const parsed = JSON.parse(savedComparison);
                if (Array.isArray(parsed)) {
                    setComparisonItems(parsed.slice(0, maxItems)); // Ensure we don't exceed max items
                }
            } catch (error) {
                console.error('Error loading comparison from localStorage:', error);
            }
        }
    }, [maxItems]);

    // Save comparison items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('handcrafted-haven-comparison', JSON.stringify(comparisonItems));
    }, [comparisonItems]);

    const addToComparison = (productId: string) => {
        setComparisonItems(prev => {
            if (!prev.includes(productId) && prev.length < maxItems) {
                return [...prev, productId];
            }
            return prev;
        });
    };

    const removeFromComparison = (productId: string) => {
        setComparisonItems(prev => prev.filter(id => id !== productId));
    };

    const isInComparison = (productId: string) => {
        return comparisonItems.includes(productId);
    };

    const clearComparison = () => {
        setComparisonItems([]);
    };

    const value: ComparisonContextType = {
        comparisonItems,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
        comparisonCount: comparisonItems.length,
        maxItems,
        canAddMore: comparisonItems.length < maxItems
    };

    return (
        <ComparisonContext.Provider value={value}>
            {children}
        </ComparisonContext.Provider>
    );
};