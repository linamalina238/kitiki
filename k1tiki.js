// Обновленный тест про котиков с личностным результатом
const catQuiz = {
    id: 'cat-quiz',
    title: "Тест: Який ти кітік?",
    questions: [
        {
            text: "Що ідеально описує твій вихідний день?",
            options: [
                { text: "Міцний сон до обіду, потім ще дрімота після обіду.", score: { Stesha: 2, Himars: 0, Baghira: 0} },
                { text: "Активні ігри, біганина по кімнаті та дослідження всіх куточків.", score: { Stesha: 0, Himars: 2, Baghira: 0} },
                { text: "Ваління на дивані під улюблений серіал і прохання печива.", score: { Stesha: 0, Himars: 0, Baghira: 2} },
            ]
        },
        {
            text: "Як ти реагуєш на несподівану проблему (наприклад, пролиту воду)?",
            options: [
                { text: "Підстрибнути на метр у повітря, а потім обережно обнюхати.", score: { Stesha: 2, Himars: 0, Baghira: 0} },
                { text: "Швидко залапати лапою, приймаючи це за нову гру.", score: { Stesha: 0, Himars: 2, Baghira: 0} },
                { text: "Обережно обійти, щоб не випачкати лапки, і з несхваленням подивитися на того, хто це зробив.", score: { Stesha: 0, Himars: 0, Baghira: 2} },
            ]
        },
        {
            text: "Твій підхід до їжі?",
            options: [
                { text: "Їм, коли дають. Головне — щоб миска не була порожньою.", score: { Stesha: 0, Himars: 0, Baghira: 2} },
                { text: "Їм все, що погано лежить. Особливо якщо це їдять господарі.", score: { Stesha: 0, Himars: 2, Baghira: 0} },
                { text: "Я — гурман. Обережно вивчаю їжу, можу відмовитися, якщо щось не так.", score: { Stesha: 2, Himars: 0, Baghira: 0} },
            ]
        },
        {
            text: "Як ти виражаєш свою прив'язаність?",
            options: [
                { text: "Легке, аристократичне піднімання хвоста і дотик лапою.", score: { Stesha: 0, Himars: 2, Baghira: 0} },
                { text: "Тертя об ноги та муркотання, коли тебе гладять.", score: { Stesha: 2, Himars: 0, Baghira: 0} },
                { text: "М'які укуси та гру, іноді трохи занадто активна.", score: { Stesha: 0, Himars: 0, Baghira: 2} },
            ]
        }
    ],
    results: {
        Stesha: {
            title: "ТИ СТЕША",
            description: "Ти - втілення затишку та розслабленості! Ти цінуєш комфорт понад усе і вмієш насолоджуватися кожним моментом спокою. Твоя філософія - життя занадто коротке, щоб поспішати.",
            gif: "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif"
        },
        Himars: {
            title: "ТИ ХАЙМАРС", 
            description: "Ти - вічна дитина з великим запасом енергії! Ти перетворюєш рутину на гру і знаходиш радість у дрібницях. З тобою ніколи не нудно, ти заряжаєш оптимізмом всіх навколо.",
            gif: "https://media.giphy.com/media/CqVNnHdR3Yg36/giphy.gif"
        },
        Baghira: {
            title: "ТИ БАГІРА",
            description: "Ти - цілеспрямований та активний дослідник! Тобі важливо досягати цілей та підкоряти нові висоти. Ти швидко приймаєш рішення і завжди готовий до пригод.",
            gif: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
        }
    }
};

// Глобальные переменные
let currentQuestion = 0;
let userAnswers = [];
let questionCount = 0;
let currentQuiz = null;
let isCustomQuiz = false;

// Навигация по страницам
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showMainMenu() {
    showPage('main-menu');
}

function showQuiz() {
    showPage('quiz-page');
    loadQuiz(catQuiz);
    isCustomQuiz = false;
}

function showCreateQuiz() {
    showPage('create-quiz');
}

function showMyQuizzes() {
    showPage('my-quizzes');
    loadMyQuizzes();
}

// Работа с тестом
function loadQuiz(quiz) {
    currentQuiz = quiz;
    currentQuestion = 0;
    userAnswers = new Array(quiz.questions.length).fill(null);
    isCustomQuiz = quiz.id !== 'cat-quiz';
    
    document.getElementById('quiz-title').textContent = quiz.title;
    displayQuestion();
}

function displayQuestion() {
    const quizContent = document.getElementById('quiz-content');
    const question = currentQuiz.questions[currentQuestion];
    
    let html = `
        <div class="question">
            <h3>Питання ${currentQuestion + 1} з ${currentQuiz.questions.length}</h3>
            <p>${question.text}</p>
            <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        const isSelected = userAnswers[currentQuestion] === index;
        const optionText = isCustomQuiz ? option : option.text;
        html += `
            <div class="option ${isSelected ? 'selected' : ''}" onclick="selectOption(${index})">
                ${optionText}
            </div>
        `;
    });
    
    html += `</div></div>`;
    
    quizContent.innerHTML = html;
    
    // Обновляем кнопки навигации
    document.getElementById('prev-btn').style.display = currentQuestion === 0 ? 'none' : 'block';
    document.getElementById('next-btn').textContent = 
        currentQuestion === currentQuiz.questions.length - 1 ? 'Завершити' : 'Далі';
        
    document.getElementById('prev-btn').style.display = 'block';
    document.getElementById('next-btn').style.display = 'block';
}

function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    displayQuestion();
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (userAnswers[currentQuestion] === null) {
        alert('Будь ласка, оберіть відповідь!');
        return;
    }

    if (currentQuestion < currentQuiz.questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContent = document.getElementById('quiz-content');
    
    if (isCustomQuiz) {
        // Для пользовательских тестов - простой подсчет
        const score = userAnswers.filter(answer => answer !== null).length;
        const totalQuestions = currentQuiz.questions.length;
        
        quizContent.innerHTML = `
            <div class="results-container">
                <h3>Результати тесту!</h3>
                <div class="result-gif">
                    <img src="https://media.giphy.com/media/3o7aD2vOBqFNLb0Hk4/giphy.gif" alt="Результат" style="max-width: 300px; border-radius: 15px; margin: 1rem 0;">
                </div>
                <div class="score">${score}/${totalQuestions}</div>
                <p>Ви відповіли на ${score} з ${totalQuestions} питань</p>
                <button class="action-btn" onclick="loadQuiz(currentQuiz)" style="margin-top: 1rem;">
                    Пройти ще раз
                </button>
                <button class="action-btn" onclick="showMainMenu()" style="margin-top: 1rem;">
                    В головне меню
                </button>
            </div>
        `;
    } else {
        // Для теста про котиков - личностный результат
        const personality = calculatePersonality();
        const result = currentQuiz.results[personality.type];
        
        quizContent.innerHTML = `
            <div class="results-container">
                <h3>Твій результат</h3>
                <div class="result-gif">
                    <img src="${result.gif}" alt="${result.title}" style="max-width: 300px; border-radius: 15px; margin: 1rem 0;">
                </div>
                <div class="personality-result">
                    <div class="personality-title">${result.title}</div>
                    <div class="personality-description">${result.description}</div>
                </div>
                
                <button class="action-btn" onclick="loadQuiz(currentQuiz)" style="margin-top: 1rem;">
                    Пройти ще раз
                </button>
                <button class="action-btn" onclick="showMainMenu()" style="margin-top: 1rem;">
                    В головне меню
                </button>
            </div>
        `;
    }
    
    document.getElementById('prev-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
}

function calculatePersonality() {
    const scores = { Stesha: 0, Himars: 0, Baghira: 0 };
    
    userAnswers.forEach((answerIndex, questionIndex) => {
        if (answerIndex !== null) {
            const option = currentQuiz.questions[questionIndex].options[answerIndex];
            Object.keys(option.score).forEach(type => {
                scores[type] += option.score[type];
            });
        }
    });
    
    // Находим доминирующий тип
    let maxScore = 0;
    let personalityType = 'Stesha';
    
    Object.keys(scores).forEach(type => {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            personalityType = type;
        }
    });
    
    return {
        type: personalityType,
        scores: scores
    };
}

// Создание теста
function addQuestion() {
    questionCount++;
    const questionsContainer = document.getElementById('questions-container');
    
    const questionHtml = `
        <div class="question-item" id="question-${questionCount}">
            <input type="text" class="form-input question-text" placeholder="Введіть питання">
            
            <div class="options-container" id="options-${questionCount}">
                <div class="option-input">
                    <input type="text" class="form-input option-text" placeholder="Варіант відповіді">
                    <button type="button" class="remove-btn" onclick="removeOption(this)">✕</button>
                </div>
            </div>
            
            <button type="button" class="action-btn" onclick="addOption(${questionCount})" style="margin: 0.5rem 0;">
                + Додати варіант
            </button>
            <button type="button" class="remove-btn" onclick="removeQuestion(${questionCount})">
                Видалити питання
            </button>
        </div>
    `;
    
    questionsContainer.insertAdjacentHTML('beforeend', questionHtml);
}

function addOption(questionId) {
    const optionsContainer = document.getElementById(`options-${questionId}`);
    
    const optionHtml = `
        <div class="option-input">
            <input type="text" class="form-input option-text" placeholder="Варіант відповіді">
            <button type="button" class="remove-btn" onclick="removeOption(this)">✕</button>
        </div>
    `;
    
    optionsContainer.insertAdjacentHTML('beforeend', optionHtml);
}

function removeOption(button) {
    button.parentElement.remove();
}

function removeQuestion(questionId) {
    const questionElement = document.getElementById(`question-${questionId}`);
    if (questionElement) {
        questionElement.remove();
    }
}

function saveQuiz() {
    const title = document.getElementById('quiz-title-input').value;
    const questions = [];
    
    document.querySelectorAll('.question-item').forEach(item => {
        const questionText = item.querySelector('.question-text').value;
        const options = [];
        
        item.querySelectorAll('.option-text').forEach(optionInput => {
            if (optionInput.value.trim() !== '') {
                options.push(optionInput.value);
            }
        });
        
        if (questionText.trim() !== '' && options.length > 0) {
            questions.push({
                text: questionText,
                options: options
            });
        }
    });
    
    if (title.trim() === '') {
        alert('Будь ласка, введіть назву тесту!');
        return;
    }
    
    if (questions.length === 0) {
        alert('Будь ласка, додайте хоча б одне питання!');
        return;
    }
    
    const newQuiz = {
        id: 'quiz-' + Date.now(),
        title: title,
        questions: questions,
        createdAt: new Date().toLocaleDateString('uk-UA')
    };
    
    // Сохраняем тест в localStorage
    saveQuizToStorage(newQuiz);
    
    // Очищаем форму
    document.getElementById('quiz-title-input').value = '';
    document.getElementById('questions-container').innerHTML = '';
    questionCount = 0;
    
    showMyQuizzes();
}

// Сохранение в localStorage
function saveQuizToStorage(quiz) {
    const quizzes = getQuizzesFromStorage();
    quizzes.push(quiz);
    localStorage.setItem('userQuizzes', JSON.stringify(quizzes));
}

function getQuizzesFromStorage() {
    const quizzes = localStorage.getItem('userQuizzes');
    return quizzes ? JSON.parse(quizzes) : [];
}

function loadMyQuizzes() {
    const quizzesList = document.getElementById('quizzes-list');
    const quizzes = getQuizzesFromStorage();
    
    if (quizzes.length === 0) {
        quizzesList.innerHTML = '<p>Ще не створено жодного тесту</p>';
        return;
    }
    
    quizzesList.innerHTML = quizzes.map(quiz => `
        <div class="quiz-item">
            <div>
                <h3>${quiz.title}</h3>
                <p>Питання: ${quiz.questions.length} | Створено: ${quiz.createdAt}</p>
            </div>
            <div class="quiz-actions">
                <button class="action-btn" onclick="startCustomQuiz('${quiz.id}')">Пройти</button>
                <button class="remove-btn" onclick="deleteQuiz('${quiz.id}')">Видалити</button>
            </div>
        </div>
    `).join('');
}

function startCustomQuiz(quizId) {
    const quizzes = getQuizzesFromStorage();
    const quiz = quizzes.find(q => q.id === quizId);
    
    if (quiz) {
        showPage('quiz-page');
        loadQuiz(quiz);
        isCustomQuiz = true;
    }
}

function deleteQuiz(quizId) {
    const quizzes = getQuizzesFromStorage();
    const filteredQuizzes = quizzes.filter(q => q.id !== quizId);
    localStorage.setItem('userQuizzes', JSON.stringify(filteredQuizzes));
    loadMyQuizzes();
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    showMainMenu();
    addQuestion(); // Добавляем первое поле для вопроса при загрузке
});
