
# -*- coding: UTF-8 -*-
from pydantic import EmailStr

from .base_schema import BaseModel

class BaseResponse(BaseModel):
    id: int

    
class ClientResponse(BaseResponse):
    first_name: str
    last_name: str
    phone: str
    email: EmailStr


class ServiceResponse(BaseResponse):
    name: str
    description: str
    price: int
        
        
class OrderResponse(BaseResponse):
    client: str
    name_service: str
    status: str
    order_date: str
    

class ReviewResponse(BaseResponse):
    client: str
    name_service: str
    review_date: str
    rating: int
    text: str
    
    
class PaymentResponse(BaseResponse):
    order_id: int
    amount: int
    payment_date: str
    payment_method: str
    
        


        

