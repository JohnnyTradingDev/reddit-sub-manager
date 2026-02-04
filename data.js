// Categories
const initialCategories = [
    { id: 'crypto', name: 'Crypto', color: '#6366f1' },
    { id: 'asian', name: 'Asian', color: '#22c55e' },
    { id: 'karma', name: 'Karma', color: '#f59e0b' },
    { id: 'zero-karma', name: 'Fast', color: '#ef4444' }
];

// FULL DATA - 57 Crypto + 5 Asian + 36 Karma + 17 Zero = 115 subs
const cryptoSubs = [
    { id: 1, url: 'https://www.reddit.com/r/CryptoCurrency/', type: 'All', subscribers: '8.4M', nature: 'Strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 2, url: 'https://www.reddit.com/r/Bitcoin/', type: 'BTC', subscribers: '7M', nature: 'Strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 3, url: 'https://www.reddit.com/r/Daytrading/', type: 'Trading', subscribers: '3.7M', nature: 'Must be trading', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 4, url: 'https://www.reddit.com/r/ethereum/', type: 'ETH', subscribers: '3.3M', nature: 'ETH only', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 5, url: 'https://www.reddit.com/r/dogecoin/', type: 'DOGE', subscribers: '2.5M', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 6, url: 'https://www.reddit.com/r/ethtrader/', type: 'ETH', subscribers: '2.3M', nature: 'ETH or trading', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 7, url: 'https://www.reddit.com/r/NFT/', type: 'NFT', subscribers: '2.3M', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 8, url: 'https://www.reddit.com/r/CryptoMoonShots/', type: 'All', subscribers: '2.1M', nature: 'Read sidebar', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 9, url: 'https://www.reddit.com/r/CryptoMarkets/', type: 'All', subscribers: '1.7M', nature: 'Strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 10, url: 'https://www.reddit.com/r/CryptoTechnology/', type: 'Tech', subscribers: '1.3M', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 11, url: 'https://www.reddit.com/r/btc/', type: 'BTC', subscribers: '1.1M', nature: 'Strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 12, url: 'https://www.reddit.com/r/BitcoinBeginners/', type: 'BTC', subscribers: '1.1M', nature: 'Strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 13, url: 'https://www.reddit.com/r/binance/', type: 'Binance', subscribers: '905k', nature: 'Binance only', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 14, url: 'https://www.reddit.com/r/cardano/', type: 'ADA', subscribers: '659k', nature: 'Cardano only', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 15, url: 'https://www.reddit.com/r/passive_income/', type: 'Income', subscribers: '532k', nature: 'Neutral', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 16, url: 'https://www.reddit.com/r/CryptoCurrencies/', type: 'All', subscribers: '392k', nature: 'Read rule', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 17, url: 'https://www.reddit.com/r/cryptocurrencymemes/', type: 'Meme', subscribers: '366k', nature: 'Picture memes only', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 18, url: 'https://www.reddit.com/r/Ripple/', type: 'XRP', subscribers: '362k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 19, url: 'https://www.reddit.com/r/litecoin/', type: 'LTC', subscribers: '359k', nature: 'LTC only', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 20, url: 'https://www.reddit.com/r/Crypto_Currency_News/', type: 'News', subscribers: '316k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 21, url: 'https://www.reddit.com/r/NFTsMarketplace/', type: 'NFT', subscribers: '311k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 22, url: 'https://www.reddit.com/r/BitcoinMarkets/', type: 'Trading', subscribers: '289k', nature: 'Trading strategy', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 23, url: 'https://www.reddit.com/r/solana/', type: 'SOL', subscribers: '266k', nature: 'Solana only', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 24, url: 'https://www.reddit.com/r/altcoin/', type: 'Alt', subscribers: '226k', nature: 'CMC/CG links required', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 25, url: 'https://www.reddit.com/r/Trading/', type: 'Trading', subscribers: '202k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 26, url: 'https://www.reddit.com/r/CryptoCurrencyTrading/', type: 'Trading', subscribers: '177k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 27, url: 'https://www.reddit.com/r/CryptoMars/', type: 'Shill', subscribers: '167k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 28, url: 'https://www.reddit.com/r/AllCryptoBets/', type: 'All', subscribers: '141k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 29, url: 'https://www.reddit.com/r/shitcoinmoonshots/', type: 'Shill', subscribers: '135k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 30, url: 'https://www.reddit.com/r/CryptoMoon/', type: 'Shill', subscribers: '135k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 31, url: 'https://www.reddit.com/r/defi/', type: 'DeFi', subscribers: '128k', nature: 'DeFi only', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 32, url: 'https://www.reddit.com/r/ethdev/', type: 'Dev', subscribers: '111k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 33, url: 'https://www.reddit.com/r/EthereumClassic/', type: 'ETC', subscribers: '101k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 34, url: 'https://www.reddit.com/r/Crypto_General/', type: 'All', subscribers: '87k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 35, url: 'https://www.reddit.com/r/CryptoMarsShots/', type: 'Shill', subscribers: '86k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 36, url: 'https://www.reddit.com/r/CoinMarketCap/', type: 'CMC', subscribers: '79k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 37, url: 'https://www.reddit.com/r/memecoins/', type: 'Meme', subscribers: '73k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 38, url: 'https://www.reddit.com/r/CryptoAirdrop/', type: 'Airdrop', subscribers: '68k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 39, url: 'https://www.reddit.com/r/crypto_currency/', type: 'All', subscribers: '49k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 40, url: 'https://www.reddit.com/r/StepN/', type: 'M2E', subscribers: '48k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 41, url: 'https://www.reddit.com/r/CryptoGamersCommunity/', type: 'Gaming', subscribers: '48k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 42, url: 'https://www.reddit.com/r/coingecko/', type: 'CG', subscribers: '39k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 43, url: 'https://www.reddit.com/r/altcoin_news/', type: 'News', subscribers: '38k', nature: 'Must be news', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 44, url: 'https://www.reddit.com/r/web3/', type: 'Web3', subscribers: '36k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 45, url: 'https://www.reddit.com/r/BitcoinAUS/', type: 'BTC', subscribers: '34k', nature: 'Australian region', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 46, url: 'https://www.reddit.com/r/Moonshotcoins/', type: 'Shill', subscribers: '34k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 47, url: 'https://www.reddit.com/r/chiliZ/', type: 'CHZ', subscribers: '29k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 48, url: 'https://www.reddit.com/r/BitcoinUK/', type: 'BTC', subscribers: '25k', nature: 'UK region', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 49, url: 'https://www.reddit.com/r/SolanaMemeCoins/', type: 'SOL Meme', subscribers: '22k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 50, url: 'https://www.reddit.com/r/CryptoExchange/', type: 'Exchange', subscribers: '18k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 51, url: 'https://www.reddit.com/r/playtoearngames/', type: 'P2E', subscribers: '18k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 52, url: 'https://www.reddit.com/r/BitgetReddit/', type: 'Bitget', subscribers: '16k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 53, url: 'https://www.reddit.com/r/CryptoPeople/', type: 'Chat', subscribers: '12k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 54, url: 'https://www.reddit.com/r/cryptomoongroup/', type: 'Shill', subscribers: '11k', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 55, url: 'https://www.reddit.com/r/defisignals/', type: 'DeFi', subscribers: '7.6k', nature: '', note: '', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 56, url: 'https://www.reddit.com/r/Metaverse_Blockchain/', type: 'Meta', subscribers: '', nature: 'Not strict', note: '', category: 'crypto', lastPosted: '', chatGPT: '' }
];

const asianSubs = [
    { id: 60, url: 'https://www.reddit.com/r/phinvest/', type: 'Investment', subscribers: '563k', nature: 'Not strict', note: 'Filipinos', category: 'asian', lastPosted: '', chatGPT: '' },
    { id: 61, url: 'https://www.reddit.com/r/CryptoIndia/', type: 'Crypto', subscribers: '291k', nature: '3 karma req', note: 'India', category: 'asian', lastPosted: '', chatGPT: '' },
    { id: 62, url: 'https://www.reddit.com/r/Brazil/', type: 'Regional', subscribers: '', nature: '', note: 'Brazil', category: 'asian', lastPosted: '', chatGPT: '' },
    { id: 63, url: 'https://www.reddit.com/r/Malaysia_Crypto/', type: 'Crypto', subscribers: '', nature: '', note: 'Malaysia', category: 'asian', lastPosted: '', chatGPT: '' },
    { id: 64, url: 'https://www.reddit.com/r/MalaysianPF/', type: 'Finance', subscribers: '', nature: '', note: 'Malaysia', category: 'asian', lastPosted: '', chatGPT: '' }
];

const karmaSubs = [
    { id: 70, url: 'https://www.reddit.com/r/funny/', type: 'Humor', subscribers: '63M', nature: 'Start from comment', note: 'Post anything funny', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 71, url: 'https://www.reddit.com/r/AskReddit/', type: 'Q&A', subscribers: '48M', nature: '', note: 'Ask or comment any questions', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 72, url: 'https://www.reddit.com/r/aww/', type: 'Pets', subscribers: '37M', nature: '', note: 'Pets pictures and lovers', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 73, url: 'https://www.reddit.com/r/memes/', type: 'Meme', subscribers: '34M', nature: 'Comment first', note: 'Need karma to post', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 74, url: 'https://www.reddit.com/r/movies/', type: 'Movies', subscribers: '34M', nature: '', note: 'Movies related', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 75, url: 'https://www.reddit.com/r/pics/', type: 'Photos', subscribers: '31M', nature: '', note: 'Take real pictures of surroundings', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 76, url: 'https://www.reddit.com/r/Jokes/', type: 'Humor', subscribers: '30M', nature: '', note: 'Make a joke post', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 77, url: 'https://www.reddit.com/r/news/', type: 'News', subscribers: '29M', nature: 'Check duplicate', note: 'Read rules first', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 78, url: 'https://www.reddit.com/r/sports/', type: 'Sports', subscribers: '21M', nature: '', note: 'Get recent links and post', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 79, url: 'https://www.reddit.com/r/Unexpected/', type: 'Video', subscribers: '11M', nature: '', note: 'Unexpected twist video/pictures', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 80, url: 'https://www.reddit.com/r/cats/', type: 'Pets', subscribers: '6.8M', nature: '', note: 'Pictures/video of cats', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 81, url: 'https://www.reddit.com/r/AnimalsBeingBros/', type: 'Animals', subscribers: '6.9M', nature: '', note: '', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 82, url: 'https://www.reddit.com/r/nonononoyes/', type: 'Video', subscribers: '4.7M', nature: '', note: 'Scary videos with good ending', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 83, url: 'https://www.reddit.com/r/math/', type: 'Education', subscribers: '3.3M', nature: '', note: 'Post maths skills and questions', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 84, url: 'https://www.reddit.com/r/dogs/', type: 'Pets', subscribers: '2.7M', nature: '', note: 'Dogs related pic/video', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 85, url: 'https://www.reddit.com/r/shitposting/', type: 'Humor', subscribers: '2.6M', nature: '', note: 'For shitposting', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 86, url: 'https://www.reddit.com/r/AnimalCrossing/', type: 'Gaming', subscribers: '2.5M', nature: '', note: '', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 87, url: 'https://www.reddit.com/r/meme/', type: 'Meme', subscribers: '2.2M', nature: 'Comment first', note: 'Start by commenting', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 88, url: 'https://www.reddit.com/r/fragrance/', type: 'Lifestyle', subscribers: '1.6M', nature: '', note: '', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 89, url: 'https://www.reddit.com/r/football/', type: 'Sports', subscribers: '893k', nature: '', note: 'Post links', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 90, url: 'https://www.reddit.com/r/nononono/', type: 'Video', subscribers: '880k', nature: 'Read sidebar', note: '', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 91, url: 'https://www.reddit.com/r/Rabbits/', type: 'Pets', subscribers: '786k', nature: '', note: 'Rabbits related photos', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 92, url: 'https://www.reddit.com/r/WhatsWrongWithYourCat/', type: 'Pets', subscribers: '753k', nature: '', note: '', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 93, url: 'https://www.reddit.com/r/FrankOcean/', type: 'Music', subscribers: '692k', nature: '', note: 'Support Frank Ocean music', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 94, url: 'https://www.reddit.com/r/RATS/', type: 'Pets', subscribers: '627k', nature: '', note: '', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 95, url: 'https://www.reddit.com/r/Pandabuy/', type: 'Shopping', subscribers: '459k', nature: '', note: 'Use shitposting filter', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 96, url: 'https://www.reddit.com/r/physicsmemes/', type: 'Education', subscribers: '272k', nature: '', note: 'Physics memes', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 97, url: 'https://www.reddit.com/r/pickuplines/', type: 'Humor', subscribers: '267k', nature: '', note: 'Browse online and twist them', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 98, url: 'https://www.reddit.com/r/pic/', type: 'Photos', subscribers: '148k', nature: '', note: 'Take real pictures', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 99, url: 'https://www.reddit.com/r/calculus/', type: 'Education', subscribers: '130k', nature: '', note: 'Calculus lovers', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 100, url: 'https://www.reddit.com/r/goats/', type: 'Animals', subscribers: '86k', nature: '', note: '', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 101, url: 'https://www.reddit.com/r/Lizards/', type: 'Animals', subscribers: '40k', nature: '', note: '', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 102, url: 'https://www.reddit.com/r/hamster/', type: 'Pets', subscribers: '23k', nature: '', note: 'Post pics related to Hamster', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 103, url: 'https://www.reddit.com/r/KenduInu_Ecosystem/', type: 'Memecoin', subscribers: '4.4k', nature: '', note: 'Support the meme', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 104, url: 'https://www.reddit.com/r/HegeCoin/', type: 'Crypto', subscribers: '1.1k', nature: '', note: 'Support the project', category: 'karma', lastPosted: '', chatGPT: '' }
];

const zeroKarmaSubs = [
    { id: 110, url: 'https://www.reddit.com/r/KenduInu_Ecosystem/', type: 'Memecoin', subscribers: '4.4k', nature: '', note: 'Support Kendu, make bullish prediction', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 111, url: 'https://www.reddit.com/r/Slothana/', type: 'Memecoin', subscribers: '', nature: '', note: 'Same as Kendu', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 112, url: 'https://www.reddit.com/r/AskReddit/', type: 'Q&A', subscribers: '48M', nature: '', note: 'Search for new post and engage', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 113, url: 'https://www.reddit.com/r/CasualConversation/', type: 'Chat', subscribers: '', nature: '', note: 'Engage in casual conversation', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 114, url: 'https://www.reddit.com/r/West_African_Food/', type: 'Food', subscribers: '', nature: '', note: 'Submit pictures of your food', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 115, url: 'https://www.reddit.com/r/notinteresting/', type: 'Random', subscribers: '', nature: '', note: 'Very easy', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 116, url: 'https://www.reddit.com/r/educationalgifs/', type: 'Education', subscribers: '', nature: '', note: '', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 117, url: 'https://www.reddit.com/r/explainlikeimfive/', type: 'Education', subscribers: '', nature: '', note: 'ELI5 posts', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 118, url: 'https://www.reddit.com/r/todayilearned/', type: 'Education', subscribers: '', nature: '', note: 'TIL posts', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 119, url: 'https://www.reddit.com/r/gifs/', type: 'Media', subscribers: '', nature: '', note: '', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 120, url: 'https://www.reddit.com/r/InternetIsBeautiful/', type: 'Web', subscribers: '', nature: '', note: 'Cool websites', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 121, url: 'https://www.reddit.com/r/mildlyinteresting/', type: 'Random', subscribers: '', nature: '', note: '', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 122, url: 'https://www.reddit.com/r/Aww_Espanol/', type: 'Pets', subscribers: '', nature: '', note: 'Spanish', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 123, url: 'https://www.reddit.com/r/dank_meme/', type: 'Meme', subscribers: '', nature: '', note: '', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 124, url: 'https://www.reddit.com/r/MemeVideos/', type: 'Meme', subscribers: '', nature: '', note: 'Meme videos', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 125, url: 'https://www.reddit.com/r/dankmemes/', type: 'Meme', subscribers: '', nature: '', note: '', category: 'zero-karma', lastPosted: '', chatGPT: '' }
];

const initialSubreddits = [...cryptoSubs, ...asianSubs, ...karmaSubs, ...zeroKarmaSubs];

function loadData() {
    const savedCategories = localStorage.getItem('reddit_categories');
    const savedSubreddits = localStorage.getItem('reddit_subreddits');
    return {
        categories: savedCategories ? JSON.parse(savedCategories) : initialCategories,
        subreddits: savedSubreddits ? JSON.parse(savedSubreddits) : initialSubreddits
    };
}

function saveData(categories, subreddits) {
    localStorage.setItem('reddit_categories', JSON.stringify(categories));
    localStorage.setItem('reddit_subreddits', JSON.stringify(subreddits));
}
