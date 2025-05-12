<?php
function whatsappSimulator()
{
    ?>
    <div class="whatsapp-simulator-container">
        <div class="whatsapp-simulator" id="whatsapp-simulator"></div>
    </div>
    <div class="input-bar">
        <input type="text" id="messageInput" placeholder="Escribe un mensaje...">
        <button onclick="sendMessage()">Enviar</button>
    </div>

    <script>
        function resetSimulator() {
            document.getElementById('whatsapp-simulator').innerHTML = '';
            document.getElementById('messageInput').value = '';
        }

        function sendMessage() {
            const messageInput = document.getElementById('messageInput');
            const messageText = messageInput.value.trim();

            if (messageText) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', 'sent');
                messageElement.innerHTML = `
                            <div class="message-content">${messageText}</div>
                        `;

                document.getElementById('whatsapp-simulator').appendChild(messageElement);
                messageInput.value = '';

                document.getElementById('whatsapp-simulator').scrollTop = document.getElementById('whatsapp-simulator').scrollHeight;
            }
        }

        // Mostrar mensaje de prueba al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            addMultipleMessages({
                pregunta: "Aquí podrás simular la conversación que tendrán tus clientes con las preguntas que hayas creado. ¿Quieres empezar?",
                respuestas: ["Reinicia el simulador o haz clic en el botón de acciones para comenzar."]
            });
        });


        function addMultipleMessages(messages) {
            const simulatorContainer = document.getElementById('whatsapp-simulator');

            // Deshabilitar todos los botones previos antes de agregar los nuevos
            const previousResponseButtons = document.querySelectorAll('.response-button');
            previousResponseButtons.forEach(button => button.disabled = true);  // Deshabilitar botones anteriores

            // Agregar la pregunta como un mensaje recibido
            const questionMessage = document.createElement('div');
            questionMessage.classList.add('message', 'received');
            questionMessage.innerHTML = `
            <div class="message-content">${messages.pregunta}</div>
        `;
            simulatorContainer.appendChild(questionMessage);

            // Agregar la respuesta principal como un mensaje de respuesta
            if (messages.respuesta) {
                const responseMessage = document.createElement('div');
                responseMessage.classList.add('message', 'sent');
                responseMessage.innerHTML = `
                <div class="message-content">${messages.respuesta}</div>
            `;
                simulatorContainer.appendChild(responseMessage);
            }

            // Crear el contenedor para las respuestas adicionales
            const responsesContainer = document.createElement('div');
            responsesContainer.classList.add('responses-container');

            // Crear botones para las respuestas adicionales
            messages.respuestas.forEach(respuesta => {
                const responseButton = document.createElement('button');
                responseButton.classList.add('response-button');
                responseButton.innerHTML = `
                <div class="message-content">${respuesta}</div>
            `;

                responseButton.addEventListener('click', function () {
                    handleResponseClick(respuesta);
                });

                responsesContainer.appendChild(responseButton);
            });

            simulatorContainer.appendChild(responsesContainer);

            // Asegurar que el contenedor se desplace hacia abajo
            simulatorContainer.scrollTop = simulatorContainer.scrollHeight;
        }

        function handleResponseClick(respuesta) {
            if (!respuesta) {
                console.log("Respuesta no válida o vacía.");
                return;
            }

            fetch("")
                .then(response => response.json())
                .then(data => {
                    if (!data.data) {
                        console.log("No se encontraron datos en la respuesta.");
                        return;
                    }

                    const matchingQuestion = data.data.find(row => row.Pregunta && row.Pregunta.toLowerCase() === respuesta.toLowerCase());

                    if (matchingQuestion) {
                        const pregunta = matchingQuestion.Pregunta;
                        const respuestaPrincipal = matchingQuestion.Respuesta || "Sin respuesta principal";
                        const respuestas = [
                            matchingQuestion.Respuesta1 || "Agregar acción",
                            matchingQuestion.Respuesta2 || "Agregar acción",
                            matchingQuestion.Respuesta3 || "Agregar acción"
                        ];

                        // Enviar tanto la pregunta, respuesta principal, como las respuestas adicionales a la función addMultipleMessages
                        addMultipleMessages({
                            pregunta: pregunta,
                            respuesta: respuestaPrincipal,
                            respuestas: respuestas
                        });
                    } else {
                        console.log("No se encontró la pregunta para esta respuesta.");
                    }
                })
                .catch(error => {
                    console.error("Error al buscar la pregunta:", error);
                });

        }
    </script>

    <style>
        .responses-container {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            padding-bottom: 10px;
        }

        .response-button {
            background-color: transparent;
            border: none;
            border-radius: 12px;
            margin: 5px 0;
            font-size: 1em;
            text-align: center;
        }

        .response-button:hover {
            transform: scale(1.05);
        }
    </style>
    <?php
}
?>