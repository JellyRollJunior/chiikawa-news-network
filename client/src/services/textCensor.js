import {
    RegExpMatcher,
    TextCensor,
    englishDataset,
    englishRecommendedTransformers,
} from 'obscenity';

const profanityMatcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
});
const textCensor = new TextCensor().setStrategy(
    // Replace profanity with *'s
    (profanity) => '*'.repeat(profanity.matchLength)
);

export { textCensor, profanityMatcher };
