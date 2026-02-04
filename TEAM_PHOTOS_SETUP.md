# Team Photos Setup Guide

## Quick Setup

1. **Add Photos to the Project:**
   - Place your team member photos in the `public/images/` folder
   - Name them exactly as shown below:
     - `mikhail-gorshkov.jpg` (or `.png`)
     - `rahul-khandelwal.jpg` (or `.png`)

2. **Photo Specifications:**
   - **Format**: JPG or PNG
   - **Size**: Minimum 400x400px, recommended 800x800px
   - **Aspect Ratio**: Square (1:1) or portrait (3:4) works best
   - **Style**: Professional headshot, neutral background
   - **File Size**: Keep under 500KB for optimal performance

## File Structure

```
public/
  images/
    mikhail-gorshkov.jpg
    rahul-khandelwal.jpg
```

## Supported File Extensions

The component supports both `.jpg` and `.png` formats. If you have different extensions, you can:

1. **Rename the files** to use `.jpg` or `.png`
2. **Or update the image paths** in `components/sections/Team.tsx`:
   ```typescript
   image: '/images/mikhail-gorshkov.png', // Change extension here
   ```

## Fallback Behavior

If a photo is missing or fails to load:
- The component will automatically show initials (e.g., "MG" for Mikhail Gorshkov)
- The card will still function normally
- No errors will be displayed

## Testing

After adding photos:
1. Restart your development server: `npm run dev`
2. Navigate to the Team section
3. Verify the photos display correctly
4. Test the hover/flip animation

## Tips for Professional Photos

- **Lighting**: Even, professional lighting
- **Background**: Neutral or blurred background
- **Expression**: Professional, approachable expression
- **Crop**: Focus on face and shoulders
- **Consistency**: Similar style and size for both photos

## Troubleshooting

**Photos not showing?**
- Check file names match exactly (case-sensitive)
- Verify files are in `public/images/` folder
- Check file extensions (.jpg or .png)
- Clear browser cache and restart dev server

**Photos look stretched?**
- Ensure photos are square or portrait orientation
- The component uses `object-cover` which crops to fit
- Consider cropping photos to square before uploading

**Want to use different file names?**
- Update the `image` property in `teamMembers` array in `components/sections/Team.tsx`
