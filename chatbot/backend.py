from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Ensure you use your own API key here
openai.api_key = 'YOUR_OPENAI_API_KEY'

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json.get('message')

        if not user_input:
            return jsonify({'response': 'No message received'})

        response = openai.Completion.create(
            engine="text-davinci-003",  # Choose the appropriate engine
            prompt=user_input,
            max_tokens=150
        )

        # Extracting text from the response
        answer = response.choices[0].text.strip()

        return jsonify({'response': answer})
    
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'response': 'Hubo un problema con la solicitud.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
