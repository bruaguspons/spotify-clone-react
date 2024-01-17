const parserNumToTime = (time: number): string => {
    if (isNaN(time)) return '00:00';

    const min = Math.floor(time / 60);
    const seg = Math.floor(time % 60);

    return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
};
export default parserNumToTime;
