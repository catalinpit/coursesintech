const notFound = (req, res) => {
    res.status(404).json({ 
        'error': '404 - Page not found!'
    });
};

module.exports = notFound;