from django.http import HttpResponse, JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


# This is the view that will be called when the user sends a POST request to the /csv/ endpoint.
# The @method_decorator is used to disable CSRF protection for this view as it is a public api endpoint.
@method_decorator(csrf_exempt, name='dispatch')
class CsvTypeInferView(View):
    def get(self, request):
        return HttpResponse('Hello, World!')
    
    def post(self, request):
        return JsonResponse({'message': 'Hello, World!'})
