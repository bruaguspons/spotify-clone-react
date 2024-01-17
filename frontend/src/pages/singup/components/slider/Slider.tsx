'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import cn from 'clsx';

const Slider = React.forwardRef<
React.ElementRef<typeof SliderPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
// eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            'relative flex touch-none select-none items-center group',
            className
        )}
        {...props}
    >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray-800">
            <SliderPrimitive.Range className="absolute h-full bg-green-400" />
        </SliderPrimitive.Track>
    </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
