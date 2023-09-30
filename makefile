install:
	#Installing all the Python requirements module.
	python -m pip install -r requirements.txt
format:
	python -m black *.py mylib/*.py

lint: 
	pylint --disable=R,C *.py mylib/*.py
run:
	#Running the code
	uvicorn main:app --host 0.0.0.0 --port 8000 --reload

all: install format lint run