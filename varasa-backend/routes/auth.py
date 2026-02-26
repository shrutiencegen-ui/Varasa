from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity
)
from datetime import timedelta

auth_bp = Blueprint("auth", __name__)

# ⚠️ In production move this to environment variables
ADMIN_USER = "admin"
ADMIN_PASS = "varasa123"


# ===============================
# LOGIN ROUTE
# ===============================
@auth_bp.route("/login", methods=["POST"])
def login():

    if not request.is_json:
        return jsonify({"message": "Invalid request format"}), 400

    data = request.get_json()

    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    # ===============================
    # REQUIRED FIELD VALIDATION
    # ===============================

    if not username and not password:
        return jsonify({"message": "Username and Password are required"}), 400

    if not username:
        return jsonify({"message": "Username is required"}), 400

    if not password:
        return jsonify({"message": "Password is required"}), 400


    # ===============================
    # CREDENTIAL VALIDATION
    # ===============================

    # Both wrong
    if username != ADMIN_USER and password != ADMIN_PASS:
        return jsonify({"message": "Invalid username and password"}), 401

    # Username wrong
    if username != ADMIN_USER:
        return jsonify({"message": "Invalid username"}), 401

    # Password wrong
    if password != ADMIN_PASS:
        return jsonify({"message": "Invalid password"}), 401


    # ===============================
    # CREATE TOKENS (SUCCESS CASE)
    # ===============================

    access_token = create_access_token(
        identity=username,
        expires_delta=timedelta(minutes=30)
    )

    refresh_token = create_refresh_token(
        identity=username,
        expires_delta=timedelta(days=7)
    )

    return jsonify({
        "access_token": access_token,
        "refresh_token": refresh_token,
        "message": "Login successful"
    }), 200


# ===============================
# REFRESH TOKEN ROUTE
# ===============================
@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():

    identity = get_jwt_identity()

    new_access_token = create_access_token(
        identity=identity,
        expires_delta=timedelta(minutes=30)
    )

    return jsonify({
        "access_token": new_access_token
    }), 200