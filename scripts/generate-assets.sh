#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images

# Function to create a colored square with text
create_image() {
    local size=$1
    local output=$2
    local text=$3
    
    convert -size ${size}x${size} xc:#1a365d \
        -fill white \
        -gravity center \
        -pointsize $((size/10)) \
        -annotate 0 "$text" \
        "$output"
}

# Generate favicon images
create_image 16 "public/favicon-16x16.png" "E"
create_image 32 "public/favicon-32x32.png" "E"

# Generate Apple touch icon
create_image 180 "public/apple-touch-icon.png" "EECFIN"

# Generate Android Chrome icons
create_image 192 "public/android-chrome-192x192.png" "EECFIN"
create_image 512 "public/android-chrome-512x512.png" "EECFIN"

# Generate Open Graph image
convert -size 1200x630 xc:#1a365d \
    -fill white \
    -gravity center \
    -pointsize 72 \
    -annotate 0 "Ethiopian Evangelical Church\nin Finland (EECFIN)" \
    "public/images/eecfin-og-image.jpg"

echo "All image assets have been generated successfully!" 