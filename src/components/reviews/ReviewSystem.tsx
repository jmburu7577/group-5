'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rating, InteractiveRating } from '@/components/ui/rating';
import { Review, getReviewsByProductId, getReviewsByArtisanId } from '@/lib/data';

interface ReviewSystemProps {
    productId?: string;
    artisanId?: string;
    reviews: Review[];
    onSubmitReview?: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

interface ReviewFormData {
    rating: number;
    title: string;
    comment: string;
    userName: string;
    userId: string;
}

export const ReviewSystem: React.FC<ReviewSystemProps> = ({
    productId,
    artisanId,
    reviews,
    onSubmitReview
}) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'>('newest');
    const [filterRating, setFilterRating] = useState<number>(0);

    const [formData, setFormData] = useState<ReviewFormData>({
        rating: 0,
        title: '',
        comment: '',
        userName: 'Current User', // In real app, this would come from auth
        userId: 'user1' // In real app, this would come from auth
    });

    // Sort and filter reviews
    const sortedAndFilteredReviews = React.useMemo(() => {
        let filtered = reviews;

        // Filter by rating
        if (filterRating > 0) {
            filtered = filtered.filter(review => review.rating === filterRating);
        }

        // Sort reviews
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'highest':
                    return b.rating - a.rating;
                case 'lowest':
                    return a.rating - b.rating;
                case 'helpful':
                    return b.helpful - a.helpful;
                default:
                    return 0;
            }
        });
    }, [reviews, sortBy, filterRating]);

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.rating === 0 || !formData.title.trim() || !formData.comment.trim()) {
            alert('Please fill in all required fields and provide a rating.');
            return;
        }

        const newReview: Omit<Review, 'id' | 'createdAt'> = {
            productId,
            artisanId,
            userId: formData.userId,
            userName: formData.userName,
            rating: formData.rating,
            title: formData.title.trim(),
            comment: formData.comment.trim(),
            helpful: 0,
            verified: true // In real app, this would be determined by purchase history
        };

        onSubmitReview?.(newReview);

        // Reset form
        setFormData({
            rating: 0,
            title: '',
            comment: '',
            userName: 'Current User',
            userId: 'user1'
        });
        setShowReviewForm(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(review => review.rating === rating).length,
        percentage: reviews.length > 0
            ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
            : 0
    }));

    return (
        <div className="space-y-6">
            {/* Reviews Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Average Rating */}
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900 mb-2">
                                {averageRating.toFixed(1)}
                            </div>
                            <Rating rating={averageRating} totalReviews={reviews.length} size="lg" />
                            <p className="text-gray-600 mt-2">Based on {reviews.length} reviews</p>
                        </div>

                        {/* Rating Distribution */}
                        <div className="space-y-2">
                            {ratingDistribution.map(({ rating, count, percentage }) => (
                                <div key={rating} className="flex items-center gap-3">
                                    <span className="text-sm font-medium w-8">{rating}★</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 w-8">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Review Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-4">
                    {/* Sort Options */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="highest">Highest Rating</option>
                        <option value="lowest">Lowest Rating</option>
                        <option value="helpful">Most Helpful</option>
                    </select>

                    {/* Rating Filter */}
                    <select
                        value={filterRating}
                        onChange={(e) => setFilterRating(parseInt(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={0}>All Ratings</option>
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                    </select>
                </div>

                <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                    {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </Button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Write Your Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Rating *
                                </label>
                                <InteractiveRating
                                    rating={formData.rating}
                                    onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <label htmlFor="reviewTitle" className="block text-sm font-medium text-gray-700 mb-2">
                                    Review Title *
                                </label>
                                <Input
                                    id="reviewTitle"
                                    type="text"
                                    placeholder="Summarize your experience"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    required
                                />
                            </div>

                            {/* Comment */}
                            <div>
                                <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Review *
                                </label>
                                <textarea
                                    id="reviewComment"
                                    rows={4}
                                    placeholder="Share your thoughts about this product..."
                                    value={formData.comment}
                                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button type="submit">Submit Review</Button>
                                <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {sortedAndFilteredReviews.length > 0 ? (
                    sortedAndFilteredReviews.map((review) => (
                        <Card key={review.id}>
                            <CardContent className="pt-6">
                                <div className="space-y-3">
                                    {/* Review Header */}
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-semibold">{review.userName}</span>
                                                {review.verified && (
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                        Verified Purchase
                                                    </span>
                                                )}
                                            </div>
                                            <Rating rating={review.rating} showText={false} size="sm" />
                                        </div>
                                        <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                                    </div>

                                    {/* Review Content */}
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                    </div>

                                    {/* Review Images */}
                                    {review.images && review.images.length > 0 && (
                                        <div className="flex gap-2">
                                            {review.images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center"
                                                >
                                                    <span className="text-xs text-gray-500">IMG</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Review Actions */}
                                    <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                                        <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
                                            👍 Helpful ({review.helpful})
                                        </button>
                                        <button className="text-sm text-gray-600 hover:text-gray-800">
                                            Report
                                        </button>
                                    </div>

                                    {/* Artisan Response */}
                                    {review.response && (
                                        <div className="bg-gray-50 rounded-lg p-4 mt-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-sm">Response from Artisan</span>
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(review.response.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700">{review.response.message}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">
                            {filterRating > 0
                                ? `No ${filterRating}-star reviews found.`
                                : 'No reviews yet. Be the first to review!'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};