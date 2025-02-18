from django.shortcuts import render
import pyttsx3
from django.http import JsonResponse
import speech_recognition as sr
from .models import SpeechText
from django.views import View
from django.http import JsonResponse
from django.http import HttpResponse
from gtts import gTTS
import io

def text_to_speech(request):
    text = request.GET.get('text', 'Hello, this is a test.')
    language = request.GET.get('language', 'en')  # Default to English

    try:
        tts = gTTS(text=text, lang=language)
        audio_stream = io.BytesIO()
        tts.write_to_fp(audio_stream)
        audio_stream.seek(0)

        response = HttpResponse(audio_stream, content_type="audio/mpeg")
        response["Content-Disposition"] = "inline; filename=speech.mp3"
        return response
    except Exception as e:
        return HttpResponse(f"Error: {str(e)}", status=500)



# def text_to_speech(request):
#     text = request.GET.get('text', 'Hello, this is a test.')

#     engine = pyttsx3.init()
#     engine.setProperty("voice", voices[2].id)
#     engine.say(text)
#     engine.runAndWait()
#     # engine = pyttsx3.init()
#     # voices = engine.getProperty('voices')
#     # for voice in voices:
#     #     print(voice, voice.id)
#     #     engine.setProperty('voice', voice.id)
#     #     engine.say(text)
#     #     engine.runAndWait()
#     #     engine.stop()


def speech_to_text(request):
    recognizer = sr.Recognizer()
    mic = sr.Microphone()

    with mic as source:
        recognizer.adjust_for_ambient_noise(source)
        print("Listening...")
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio)  # OS-based speech recognition
        transcription = SpeechText.objects.create(text=text)  # Store in DB
        return JsonResponse({"transcription": text, "id": transcription.id, "message": "Saved successfully!"})
    except sr.UnknownValueError:
        return JsonResponse({"error": "Could not understand audio"})
    except sr.RequestError:
        return JsonResponse({"error": "Recognition service unavailable"})


def get_transcriptions(request):
    transcriptions = SpeechText.objects.all().order_by("-created_at")  # Get latest first
    transcription_list = [
        {
            "id": t.id,
            "text": t.text,
            "created_at": t.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        for t in transcriptions
    ]

    return JsonResponse({"transcriptions": transcription_list})


class DeleteTranscriptionView(View):
    def delete(self, request, transcription_id):
        try:
            # Get the transcription by its ID
            transcription = SpeechText.objects.get(id=transcription_id)
            transcription.delete()  # Delete the transcription from the database
            return JsonResponse({"message": "Transcription deleted successfully."}, status=200)
        except SpeechText.DoesNotExist:
            return JsonResponse({"message": "Transcription not found."}, status=404)
