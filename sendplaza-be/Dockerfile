# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM python:3.7

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1


# create root directory for our project in the container
RUN mkdir /app

ADD requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app/

EXPOSE 5000

ENTRYPOINT ["sh", "entrypoint.sh"]
