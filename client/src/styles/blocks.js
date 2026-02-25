const BLOCKS = ['duckegg-block', 'yellow-block', 'pink-block'];

const getBlockStyleByIndex = (index = 0) => {
    return BLOCKS[index % BLOCKS.length];
};

export { BLOCKS, getBlockStyleByIndex };
