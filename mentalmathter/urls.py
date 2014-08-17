from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'problems.views.simple_addition', name='home'),
    url(r'^problems/', include('problems.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
