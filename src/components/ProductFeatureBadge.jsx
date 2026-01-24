import { Zap, PartyPopper, Star, Flame, Sparkles, Gem, Shirt, Siren } from 'lucide-react';

const featureConfig = {
    'super-fast': {
        icon: Zap,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-200',
    },
    'party-ready': {
        icon: PartyPopper,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
        borderColor: 'border-purple-200',
    },
    'featured': {
        icon: Star,
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200',
    },
    'best-seller': {
        icon: Flame,
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
    },
    'new-arrival': {
        icon: Sparkles,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
    },
    'premium': {
        icon: Gem,
        bgColor: 'bg-gray-900',
        textColor: 'text-white',
        borderColor: 'border-gray-700',
    },
    'oversized': {
        icon: Shirt,
        bgColor: 'bg-indigo-100',
        textColor: 'text-indigo-700',
        borderColor: 'border-indigo-200',
    },
    'limited-drop': {
        icon: Siren,
        bgColor: 'bg-red-500',
        textColor: 'text-white',
        borderColor: 'border-red-600',
    },
};

export default function ProductFeatureBadge({ feature, size = 'small' }) {
    if (!feature) return null;

    const config = featureConfig[feature.slug] || {
        icon: Star,
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200',
    };

    const Icon = config.icon;

    const sizeClasses = {
        small: 'px-2 py-1 text-[10px]',
        medium: 'px-3 py-1.5 text-xs',
        large: 'px-4 py-2 text-sm',
    };

    const iconSizes = {
        small: 'w-3 h-3',
        medium: 'w-4 h-4',
        large: 'w-5 h-5',
    };

    return (
        <div
            className={`inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wide border ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses[size]}`}
        >
            <Icon className={iconSizes[size]} />
            <span>{feature.name}</span>
        </div>
    );
}
