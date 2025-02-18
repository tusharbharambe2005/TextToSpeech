# speech_app/urls.py
from django.urls import path
from .views import text_to_speech, speech_to_text, get_transcriptions, DeleteTranscriptionView

urlpatterns = [
    path('text-to-speech/', text_to_speech, name='text_to_speech'),
    path('speech-to-text/', speech_to_text, name='speech_to_text'),
    path('get-transcriptions/', get_transcriptions, name='get_transcriptions'),
    path('delete-transcription/<int:transcription_id>/', DeleteTranscriptionView.as_view(), name='delete_transcription'),  # Delete endpoint
]
