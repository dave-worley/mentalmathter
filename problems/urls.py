from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^$', 'problems.views.home', name='home'),
    url(r'^simple/add/$', 'problems.views.simple_addition', name='simple_add'),
)
