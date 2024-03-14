from django.forms import ValidationError
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rhombus import utils
from .models import CsvFileInfer


# This is the view that will be called when the user sends a POST request to the /csv/ endpoint.
# The @method_decorator is used to disable CSRF protection for this view as it is a public api endpoint.
@method_decorator(csrf_exempt, name='dispatch')
class CsvTypeInferView(View):
    def get(self, request):
        return HttpResponse('Hello, World!')
    
    def post(self, request):
        data = {}
        file = request.FILES.get('file')

        if file is None:
            data = utils.get_error_response(code=400, messsage='No file provided', path=request.path)
            return JsonResponse(data=data, status=400)
        
        model = CsvFileInfer(file=file)
        try:
            model.full_clean()
            model.save()
            data = utils.get_success_response(data={
                "columns": model.columns,
            })
            
        except ValidationError as e:
            print(e.messages)
            return JsonResponse(data=utils.get_error_response(code=400, messsage=str(e.error_dict), path=request.path), status=400)
        
        return JsonResponse(data)
