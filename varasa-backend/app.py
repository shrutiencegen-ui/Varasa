import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from database import db
from routes.content import content_bp
from routes.auth import auth_bp
from flask_jwt_extended import JWTManager
from datetime import timedelta

app = Flask(__name__)

# ---------------- JWT CONFIG ----------------
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)

app.config["JWT_SECRET_KEY"] = os.environ.get(
    "JWT_SECRET_KEY",
    "change-this-in-production"
)

app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"

jwt = JWTManager(app)

# ---------------- CORS ----------------

allowed_origins = [
    "https://varasa-1.onrender.com",
    "https://varasa-125i.vercel.app"
]

CORS(
    app,
    resources={r"/api/*": {
        "origins": allowed_origins,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }},
    supports_credentials=True
)

# ---------------- DATABASE ----------------

database_url = os.environ.get("DATABASE_URL")

if database_url:
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)

    app.config["SQLALCHEMY_DATABASE_URI"] = database_url

else:
    raise Exception("DATABASE_URL not found in environment variables")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# ---------------- UPLOAD FOLDER ----------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------- INIT DATABASE ----------------

db.init_app(app)

# Create tables only if database connected
with app.app_context():
    db.create_all()

# ---------------- REGISTER ROUTES ----------------

app.register_blueprint(content_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api")

# ---------------- SERVE UPLOADED IMAGES ----------------

@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

# ---------------- HEALTH CHECK ----------------

@app.route("/")
def home():
    return "Backend running"

# ---------------- RUN ----------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)