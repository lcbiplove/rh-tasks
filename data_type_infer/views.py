import logging

from django.forms import ValidationError
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rhombus import utils
from .models import CsvFileInfer
from .infer_data_types import InferDataType

logger = logging.getLogger('django')

# This is the view that will be called when the user sends a POST request to the /csv/ endpoint.
# The @method_decorator is used to disable CSRF protection for this view as it is a public api endpoint.
@method_decorator(csrf_exempt, name='dispatch')
class CsvTypeInferView(View):
    def get(self, request):
        return HttpResponse('Hello, World!')
    
    def post(self, request):
        data = {}
        file = request.FILES.get('file')
        obj = CsvFileInfer(file=file, title=request.POST.get('title'))
        try:
            obj.full_clean()
            obj.save()
            infObj = InferDataType(obj.file.path)
            columns, rows = infObj.columns, infObj.rows
            obj.columns, obj.rows = columns, rows
            obj.save()
            
            logger.info("Inferred columns: %s", columns)
            data = utils.get_success_response(data={
                "id": obj.id,
                "title": obj.title,
                "columns": obj.columns,
                "rows": obj.rows,
            })
        except ValidationError as e:
            return JsonResponse(data=utils.get_error_response(code=400, messsage=e.message_dict, path=request.path), status=400)
        except Exception as e:
            logger.error("Error occured while saving csv file infer model: %s", e)
            return JsonResponse(data=utils.get_error_response(code=500, messsage={'global': 'Oops internal error occured.'}, path=request.path), status=500)
        
        return JsonResponse(data)
