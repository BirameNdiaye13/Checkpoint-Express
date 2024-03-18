const express = require('express');
const app = express();
const path = require('path');

// Middleware pour servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware personnalisé pour vérifier l'heure de la requête
app.use((req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();

    // Jours de la semaine du lundi (1) au vendredi (5)
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

    // Heures de travail de 9h à 17h
    const isWorkingHour = hour >= 9 && hour < 17;

    if (!isWeekday || !isWorkingHour) {
        res.send('<h1>Le site n\'est disponible que pendant les heures de travail (du lundi au vendredi, de 9h à 17h).</h1>');
    } else {
        next();
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Configuration du moteur de template EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
