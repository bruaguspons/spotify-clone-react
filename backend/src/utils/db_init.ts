import { PrismaClient } from '@prisma/client';
import { playlists } from '@/lib/data';
import { colors } from '@/lib/colors';
import { type color } from '@/lib/colors.d';
const prisma = new PrismaClient();

const getColorName = (color: color): string => {
    for (const colorName of Object.keys(colors)) {
        if (colors[colorName].accent === color.accent && colors[colorName].dark === color.dark) {
            return colorName;
        }
    }
    return '';
};

// (async() => {
//     for (const colorName of Object.keys(colors)) {
//         await prisma.colors.create({
//             data: {
//                 name: colorName,
//                 accent: colors[colorName].accent,
//                 dark: colors[colorName].dark
//             }
//         });
//     }
// })().catch(err => { console.error(err); });

(async() => {
    for (const playlist of playlists) {
        const { title, albumId, artists, color, cover } = playlist;

        const colorName = getColorName(color);

        await prisma.playlist.create({
            data: {
                title,
                albumId,
                artists,
                cover,
                color: {
                    connectOrCreate: { where: { name: colorName }, create: { name: colorName, accent: color.accent, dark: color.dark } }
                    // connect: { name: colorName }
                }
            }
        });
    }
})().catch(err => { console.error(err); });
