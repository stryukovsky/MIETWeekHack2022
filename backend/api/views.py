from rest_framework.decorators import APIView
from rest_framework.request import Request
from rest_framework.response import Response


class ExampleView(APIView):

    def get(self, request: Request):
        return Response({
            "hello": "World"
        })
