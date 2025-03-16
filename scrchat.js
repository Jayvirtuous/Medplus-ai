
const messagesContainer = document.getElementById('messages');
        const userInput = document.getElementById('user-input');

        const healthAdvice = {
            "headache": "It sounds like you might have a headache. Try resting in a dark room and consider taking an over-the-counter pain reliever. If headaches persist, consult a doctor.",
            "fever": "It sounds like you might have a fever. Stay hydrated and rest. Consider taking acetaminophen to reduce fever. If symptoms persist, consult a doctor.",
            "cough": "Stay hydrated. Try cough suppressants and throat lozenges. Use a humidifier.",
            "cold": "Rest and stay hydrated. Use over-the-counter cold medications for symptom relief.",
            "flu": "Rest and stay hydrated. Take antiviral medications if prescribed by a doctor.",
            "stomachache": "Stomach aches can result from various issues. Try to identify if certain foods are causing it and consider using antacids or other remedies. Persistent pain should be checked by a doctor. Avoid solid foods and dairy products. Drink clear fluids. Try over-the-counter antacids.",
            "allergies": "For allergy symptoms, avoid known triggers and consider using antihistamines. If symptoms are severe or persistent, consult a doctor. Avoid allergens. Take antihistamines. Use decongestants if needed.",
            "asthma": "Use your inhaler as prescribed. Avoid asthma triggers. Monitor your symptoms.",
            "back pain": "For back pain, try rest, over-the-counter pain relievers, and gentle stretching exercises. Persistent or severe pain should be evaluated by a doctor. Apply heat or ice. Take over-the-counter pain relievers. Do gentle stretching exercises.",
            "earache": "Earaches can be caused by infections or wax buildup. Use warm compresses for pain relief and over-the-counter medications if necessary. Persistent earaches should be checked by a doctor. Apply a warm compress. Take over-the-counter pain relievers. Consult a doctor if pain persists.",
            "sore throat": "A sore throat can be soothed by Gargle with salt water. Drink warm liquids. Use throat lozenges and pain relievers. If it lasts more than a few days, consult a doctor.",
            "rash": "A rash can be a reaction to various things like allergens or irritants. Keep the area clean and use over-the-counter creams if needed. Persistent or severe rashes should be checked by a doctor. Keep the affected area clean and dry. Apply over-the-counter anti-itch creams. Avoid scratching.",
            "insomnia": "For insomnia, establish a regular sleep schedule, create a comfortable sleep environment, and avoid caffeine and screens before bed. If sleep issues persist, consult a doctor. Establish a regular sleep schedule. Avoid caffeine and electronics before bedtime. Create a calming bedtime routine.",
            "nausea": "For nausea, try to stay hydrated and eat bland foods. Avoid strong odors and rest. If nausea persists or is severe, consult a doctor. Drink clear fluids. Eat small meals. Avoid strong odors and spicy foods.",
            "vomiting": "Stay hydrated with clear fluids. Avoid solid foods until vomiting stops. Rest and avoid strenuous activity.",
            "diarrhea": "For diarrhea, stay hydrated and try an over-the-counter anti-diarrheal medication. If it lasts more than a couple of days, seek medical advice. Drink plenty of fluids. Eat bland, low-fiber foods. Avoid dairy and fatty foods.",
            "constipation": "Constipation can often be relieved by increasing fiber intake, drinking plenty of water, and exercising. Over-the-counter laxatives can also help. If it persists, consult a doctor. Increase fiber intake. Drink plenty of water. Exercise regularly.",
            "indigestion": "Eat smaller meals. Avoid spicy and fatty foods. Take antacids if needed.",
            "heartburn": "Avoid trigger foods. Eat smaller meals. Take over-the-counter antacids.",
            "dizziness": "Dizziness can be caused by dehydration, low blood pressure, or other conditions. Sit down and rest, drink water, and avoid sudden movements. If it continues, see a doctor.",
            "fatigue": "Fatigue can result from various factors, including lack of sleep, stress, or poor nutrition. Ensure you are getting enough rest, eating a balanced diet, and managing stress. Persistent fatigue should be discussed with a doctor. Get enough sleep. Eat a balanced diet. Exercise regularly.",
            "shortness of breath": "Shortness of breath can have many causes, including respiratory infections, asthma, or anxiety. If you experience severe or persistent shortness of breath, seek medical attention immediately. Use your prescribed inhaler if you have one. Sit and rest. Seek medical help if severe.",
            "chest pain": "Chest pain can be serious. If you experience severe or persistent chest pain, seek medical help immediately. Mild pain might be due to muscle strain or acid reflux, but a doctor should evaluate it. Rest and avoid exertion. Take prescribed medications. Seek emergency help if severe.",
            "abdominal pain": "Rest and apply heat. Take over-the-counter pain relievers. Avoid heavy meals.",
            "joint pain": "Joint pain can be relieved with rest, ice, and over-the-counter pain medications. If it persists, or if you have swelling or redness, consult a doctor. Apply heat or ice. Take over-the-counter pain relievers. Rest the affected joint.",
            "muscle pain": "Apply ice and rest the muscle. Take over-the-counter pain relievers. Do gentle stretching.",
            "toothache": "Rinse with warm salt water. Apply a cold compress. Take over-the-counter pain relievers.",
            "eye pain": "Eye irritation can be caused by dry eyes, allergies, or infections. Use artificial tears for dryness and avoid rubbing your eyes. See a doctor if the irritation persists or worsens. Rinse the eye with clean water.",
            "urinary pain": "Drink plenty of water. Avoid irritants like caffeine. Consult a doctor if symptoms persist.",
            "skin infection": "Keep the area clean and dry. Apply over-the-counter antibiotic ointment. Consult a doctor if it worsens.",
            "anxiety": "Practice relaxation techniques. Exercise regularly. Seek professional help if needed."
        };

        function sendMessage() {
            const message = userInput.value.trim().toLowerCase();
            userInput.value = '';
        
            if (message === '') return;
        
            displayMessage(message, 'user');
        
            if (['hello', 'hi', 'hey'].includes(message)) {
                displayMessage("Welcome to Medplus AI Chat, Please select your symptom or type below", 'system');
                showDropdown();
            } else {
                // Check if the message contains any symptom keywords
                let foundSymptom = null;
                for (const symptom in healthAdvice) {
                    if (message.includes(symptom)) {
                        foundSymptom = symptom;
                        break;
                    }
                }
        
                if (foundSymptom) {
                    fetchMedicalAdvice(foundSymptom);
                } else {
                    displayMessage("Sorry, I didn't understand that. Please select a symptom from the dropdown or type it.", 'system');
                }
            }
        }
        
        
        function displayMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', sender);
        
            const textElement = document.createElement('div');
            textElement.classList.add('text');
            textElement.textContent = message;
        
            messageElement.appendChild(textElement);
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        function showDropdown() {
            const dropdownHTML = `
                <div class="message system">
                    <div class="text dropdown-container">
                        <select id="symptom-dropdown">
                            <option value="">Select a symptom</option>
                            ${Object.keys(healthAdvice).map(symptom => `<option value="${symptom}">${symptom.charAt(0).toUpperCase() + symptom.slice(1)}</option>`).join('')}
                        </select>
                        <button onclick="contactDoctor()">Contact Doctor</button>
                    </div>
                </div>
            `;
            messagesContainer.innerHTML += dropdownHTML;
            document.getElementById('symptom-dropdown').addEventListener('change', () => {
                const selectedSymptom = document.getElementById('symptom-dropdown').value;
                if (selectedSymptom) {
                    fetchMedicalAdvice(selectedSymptom);
                }
            });
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        function fetchMedicalAdvice(symptom) {
            displayMessage(`Medical advice for ${symptom}: ${healthAdvice[symptom]}`, 'system');
        }
        
        function contactDoctor() {
            alert('Contact Medical Practitioner at: +234-906-317-6844');
        }
        
        // Event listener for the Enter key
        userInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
        