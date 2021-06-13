from enum import unique
from rest_framework.parsers import MultiPartParser
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework.response import Response
import random
import string
import uuid
import math
from datetime import datetime
from .serializers import *
from django.utils import timezone
from django.shortcuts import get_object_or_404
from datetime import timedelta
import csv


base_date_time = datetime.now()
now = (datetime.strftime(base_date_time, "%Y-%m-%d %H:%M"))