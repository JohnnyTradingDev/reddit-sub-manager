// Initial categories
const initialCategories = [
    { id: 'crypto', name: 'Crypto', color: '#6366f1' },
    { id: 'asian', name: 'Asian', color: '#22c55e' },
    { id: 'karma', name: 'Karma', color: '#f59e0b' },
    { id: 'zero-karma', name: 'Zero Karma', color: '#ef4444' }
];

// Initial subreddits with new fields: lastPosted, chatGPT
const cryptoSubs = [
    { id: 1, url: 'https://www.reddit.com/r/CryptoCurrency/', type: 'Everything', subscribers: '8.4M', nature: 'Strict', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 2, url: 'https://www.reddit.com/r/Bitcoin/', type: 'Bitcoin', subscribers: '7M', nature: 'Strict', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 3, url: 'https://www.reddit.com/r/ethereum/', type: 'Ethereum', subscribers: '3.3M', nature: 'Must be ETH related', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 4, url: 'https://www.reddit.com/r/btc/', type: 'BTC', subscribers: '1.1M', nature: 'Strict', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 5, url: 'https://www.reddit.com/r/CryptoMoonShots/', type: 'All crypto', subscribers: '2.1M', nature: 'Read sidebar', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 6, url: 'https://www.reddit.com/r/ethtrader/', type: 'ETH Trading', subscribers: '2.3M', nature: 'ETH or trading', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 7, url: 'https://www.reddit.com/r/cryptocurrencymemes/', type: 'Memes', subscribers: '366k', nature: 'Picture memes only', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 8, url: 'https://www.reddit.com/r/CryptoMarkets/', type: 'Markets', subscribers: '1.7M', nature: 'Strict', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 9, url: 'https://www.reddit.com/r/dogecoin/', type: 'Dogecoin', subscribers: '2.5M', nature: 'Not strict', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 10, url: 'https://www.reddit.com/r/solana/', type: 'Solana', subscribers: '266k', nature: 'Solana chain only', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 11, url: 'https://www.reddit.com/r/defi/', type: 'DeFi', subscribers: '128k', nature: 'DeFi related', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 12, url: 'https://www.reddit.com/r/NFT/', type: 'NFT', subscribers: '2.3M', nature: 'Not strict', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 13, url: 'https://www.reddit.com/r/Daytrading/', type: 'Trading', subscribers: '3.7M', nature: 'Trading related', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 14, url: 'https://www.reddit.com/r/binance/', type: 'Binance', subscribers: '905k', nature: 'Binance related', category: 'crypto', lastPosted: '', chatGPT: '' },
    { id: 15, url: 'https://www.reddit.com/r/cardano/', type: 'Cardano', subscribers: '659k', nature: 'Cardano related', category: 'crypto', lastPosted: '', chatGPT: '' }
];

const asianSubs = [
    { id: 50, url: 'https://www.reddit.com/r/phinvest/', type: 'Investment', subscribers: '563k', nature: 'Filipinos', category: 'asian', lastPosted: '', chatGPT: '' },
    { id: 51, url: 'https://www.reddit.com/r/CryptoIndia/', type: 'India crypto', subscribers: '291k', nature: '3 comment karma', category: 'asian', lastPosted: '', chatGPT: '' },
    { id: 52, url: 'https://www.reddit.com/r/Malaysia_Crypto/', type: 'Malaysia', subscribers: '', nature: 'Malaysia', category: 'asian', lastPosted: '', chatGPT: '' }
];

const karmaSubs = [
    { id: 60, url: 'https://www.reddit.com/r/funny/', type: 'Humor', subscribers: '63M', nature: 'Anything funny', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 61, url: 'https://www.reddit.com/r/AskReddit/', type: 'Q&A', subscribers: '48M', nature: 'Ask questions', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 62, url: 'https://www.reddit.com/r/aww/', type: 'Pets', subscribers: '37M', nature: 'Pet pictures', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 63, url: 'https://www.reddit.com/r/memes/', type: 'Memes', subscribers: '34M', nature: 'Comment first', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 64, url: 'https://www.reddit.com/r/pics/', type: 'Photos', subscribers: '31M', nature: 'Real pictures', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 65, url: 'https://www.reddit.com/r/Jokes/', type: 'Humor', subscribers: '30M', nature: 'Make jokes', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 66, url: 'https://www.reddit.com/r/sports/', type: 'Sports', subscribers: '21M', nature: 'Sports lover', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 67, url: 'https://www.reddit.com/r/cats/', type: 'Pets', subscribers: '6.8M', nature: 'Cat pics/video', category: 'karma', lastPosted: '', chatGPT: '' },
    { id: 68, url: 'https://www.reddit.com/r/dogs/', type: 'Pets', subscribers: '2.7M', nature: 'Dogs related', category: 'karma', lastPosted: '', chatGPT: '' }
];

const zeroKarmaSubs = [
    { id: 80, url: 'https://www.reddit.com/r/CasualConversation/', type: 'Chat', subscribers: '', nature: 'Casual chat', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 81, url: 'https://www.reddit.com/r/notinteresting/', type: 'Random', subscribers: '', nature: 'Easy karma', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 82, url: 'https://www.reddit.com/r/todayilearned/', type: 'Education', subscribers: '', nature: 'TIL posts', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 83, url: 'https://www.reddit.com/r/mildlyinteresting/', type: 'Random', subscribers: '', nature: 'Easy', category: 'zero-karma', lastPosted: '', chatGPT: '' },
    { id: 84, url: 'https://www.reddit.com/r/dankmemes/', type: 'Memes', subscribers: '', nature: 'Meme posting', category: 'zero-karma', lastPosted: '', chatGPT: '' }
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
