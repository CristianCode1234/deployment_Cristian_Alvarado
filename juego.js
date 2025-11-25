 let stats = {
            wins: 0,
            draws: 0,
            losses: 0
        };

        let difficulty = 'easy';
        let choices = ['piedra', 'papel', 'tijera'];

        function setDifficulty(level) {
            difficulty = level;
            
            // Actualizar botones de dificultad
            const buttons = document.querySelectorAll('.btn-difficulty');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }

        function getComputerChoice() {
            if (difficulty === 'easy') {
                // Fácil: 40% posibilidad de escoger mal
                if (Math.random() < 0.4) {
                    return choices[Math.floor(Math.random() * choices.length)];
                }
            } else if (difficulty === 'medium') {
                // Normal: 60% posibilidad de jugar bien
                if (Math.random() < 0.4) {
                    return choices[Math.floor(Math.random() * choices.length)];
                }
            } else if (difficulty === 'hard') {
                // Difícil: 80% posibilidad de ganar
                if (Math.random() < 0.2) {
                    return choices[Math.floor(Math.random() * choices.length)];
                }
            }

            // Lógica default: elegir aleatoriamente
            return choices[Math.floor(Math.random() * choices.length)];
        }

        function determineWinner(playerChoice, computerChoice) {
            if (playerChoice === computerChoice) {
                return 'draw';
            }

            if (
                (playerChoice === 'piedra' && computerChoice === 'tijera') ||
                (playerChoice === 'papel' && computerChoice === 'piedra') ||
                (playerChoice === 'tijera' && computerChoice === 'papel')
            ) {
                return 'win';
            }

            return 'lose';
        }

        function getEmoji(choice) {
            const emojis = {
                'piedra': '🪨',
                'papel': '📄',
                'tijera': '✂️'
            };
            return emojis[choice];
        }

        function updateVictoryStars() {
            for (let i = 1; i <= 5; i++) {
                const star = document.getElementById(`star${i}`);
                if (i <= stats.wins) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            }

            if (stats.wins === 5) {
                const victoryIndicator = document.getElementById('victoryIndicator');
                victoryIndicator.classList.add('achieved');
                victoryIndicator.innerHTML = '<div class="game-over-message">🏆 ¡FELICIDADES! ¡GANASTE EL JUEGO! 🏆</div><div class="victory-progress"><span class="victory-star active">⭐</span><span class="victory-star active">⭐</span><span class="victory-star active">⭐</span><span class="victory-star active">⭐</span><span class="victory-star active">⭐</span></div>';
            }
        }

        function showGameOverModal(isVictory) {
            const modal = document.getElementById('modalOverlay');
            const icon = document.getElementById('modalIcon');
            const title = document.getElementById('modalTitle');
            const message = document.getElementById('modalMessage');

            if (isVictory) {
                icon.textContent = '🏆';
                title.textContent = '¡GANASTE EL JUEGO!';
                title.className = 'modal-title victory';
                message.textContent = '¡Felicidades! Has alcanzado 5 victorias y eres el campeón. Eres increíble 🎉';
            } else {
                icon.textContent = '😞';
                title.textContent = '¡JUEGO TERMINADO!';
                title.className = 'modal-title defeat';
                message.textContent = 'El robot ha ganado. Pero no te desanimes, ¡puedes intentarlo de nuevo!';
            }

            modal.classList.add('active');
        }

        function closeModal() {
            const modal = document.getElementById('modalOverlay');
            modal.classList.remove('active');
        }

        function resetGameFromModal() {
            closeModal();
            resetGame();
        }

        function playGame(playerChoice) {
            if (stats.wins === 5 || stats.losses === 5) {
                return;
            }

            const computerChoice = getComputerChoice();
            const result = determineWinner(playerChoice, computerChoice);

            // Actualizar elecciones mostradas
            document.getElementById('playerChoice').textContent = getEmoji(playerChoice) + ' ' + playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
            document.getElementById('robotChoice').textContent = getEmoji(computerChoice) + ' ' + computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

            // Actualizar estadísticas
            const resultDisplay = document.getElementById('resultDisplay');
            
            if (result === 'win') {
                stats.wins++;
                resultDisplay.textContent = '¡GANASTE! 🎉';
                resultDisplay.className = 'result-display win';
            } else if (result === 'lose') {
                stats.losses++;
                resultDisplay.textContent = '¡PERDISTE! 😞';
                resultDisplay.className = 'result-display lose';
            } else {
                stats.draws++;
                resultDisplay.textContent = '¡EMPATE! 🤝';
                resultDisplay.className = 'result-display draw';
            }

            // Actualizar contadores
            document.getElementById('winCount').textContent = stats.wins;
            document.getElementById('drawCount').textContent = stats.draws;
            document.getElementById('loseCount').textContent = stats.losses;

            // Actualizar estrellas de victoria
            updateVictoryStars();

            // Verificar si el juego terminó
            if (stats.wins === 5) {
                setTimeout(() => showGameOverModal(true), 500);
            } else if (stats.losses === 5) {
                setTimeout(() => showGameOverModal(false), 500);
            }
        }

        function resetGame() {
            stats = {
                wins: 0,
                draws: 0,
                losses: 0
            };

            document.getElementById('winCount').textContent = '0';
            document.getElementById('drawCount').textContent = '0';
            document.getElementById('loseCount').textContent = '0';
            document.getElementById('playerChoice').textContent = 'Esperando...';
            document.getElementById('robotChoice').textContent = 'Esperando...';
            document.getElementById('resultDisplay').textContent = 'Elige una opción para comenzar';
            document.getElementById('resultDisplay').className = 'result-display';

            const victoryIndicator = document.getElementById('victoryIndicator');
            victoryIndicator.classList.remove('achieved');
            victoryIndicator.innerHTML = '<div class="victory-text">Gana 5 victorias para ser campeón:</div><div class="victory-progress"><span class="victory-star" id="star1">⭐</span><span class="victory-star" id="star2">⭐</span><span class="victory-star" id="star3">⭐</span><span class="victory-star" id="star4">⭐</span><span class="victory-star" id="star5">⭐</span></div>';

            updateVictoryStars();
        }
