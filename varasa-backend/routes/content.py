import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from database import db
from models import Content
from flask_jwt_extended import jwt_required

content_bp = Blueprint("content", __name__)

# ---------------- GET SECTION (PUBLIC) ----------------
@content_bp.route("/content/<section>", methods=["GET"])
def get_section(section):
    items = Content.query.filter_by(section=section)\
        .order_by(Content.position).all()

    data = []
    for i in items:
        data.append({
            "id": i.id,
            "title": i.title,
            "desc": i.desc,
            "img": i.img,
            "date": i.date,
            "location": i.location,
            "author": i.author,
            "year": i.year
        })

    return jsonify(data)


# ---------------- CREATE ----------------
@content_bp.route("/content/<section>", methods=["POST"])
@jwt_required()
def create(section):
    data = request.json

    last_item = Content.query.filter_by(section=section)\
        .order_by(Content.position.desc()).first()

    next_position = 0 if not last_item else last_item.position + 1

    item = Content(
        section=section,
        title=data.get("title"),
        desc=data.get("desc"),
        img=data.get("img"),
        date=data.get("date"),
        location=data.get("location"),
        author=data.get("author"),
        year=data.get("year"),
        position=next_position
    )

    db.session.add(item)
    db.session.commit()

    return jsonify({"message": "Created", "id": item.id})


# ---------------- UPDATE ----------------
@content_bp.route("/content/<int:id>", methods=["PUT"])
@jwt_required()
def update(id):
    item = Content.query.get(id)

    if not item:
        return jsonify({"message": "Item not found"}), 404

    data = request.json

    item.title = data.get("title")
    item.desc = data.get("desc")
    item.img = data.get("img")
    item.date = data.get("date")
    item.location = data.get("location")
    item.author = data.get("author")
    item.year = data.get("year")

    db.session.commit()
    return jsonify({"message": "Updated"})


# ---------------- DELETE ----------------
@content_bp.route("/content/<int:id>", methods=["DELETE"])
@jwt_required()
def delete(id):
    item = Content.query.get(id)

    if not item:
        return jsonify({"message": "Item not found"}), 404

    section_name = item.section

    db.session.delete(item)
    db.session.commit()

    remaining = Content.query.filter_by(section=section_name)\
        .order_by(Content.position).all()

    for index, content in enumerate(remaining):
        content.position = index

    db.session.commit()

    return jsonify({"message": "Deleted and reordered"})


# ---------------- IMAGE UPLOAD ----------------
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@content_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload():

    if "file" not in request.files:
        return jsonify({"message": "No file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"message": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"message": "Invalid file type"}), 400

    filename = secure_filename(file.filename)
    unique_name = f"{uuid.uuid4().hex}_{filename}"

    file_path = os.path.join(
        current_app.config["UPLOAD_FOLDER"], unique_name
    )
    file.save(file_path)

    # 🔥 IMPORTANT: Return RELATIVE path only
    return jsonify({
        "url": f"/uploads/{unique_name}"
    }), 200