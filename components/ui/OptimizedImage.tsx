import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    containerClassName?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    className = "",
    containerClassName = "",
    alt,
    src,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden bg-gray-100 dark:bg-zinc-800 ${containerClassName}`}>
            {/* Loading Skeleton */}
            <div
                className={`absolute inset-0 bg-gray-200 dark:bg-zinc-800 animate-pulse transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
            />

            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${className} ${isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105'}`}
                {...props}
            />
        </div>
    );
};

export default OptimizedImage;
