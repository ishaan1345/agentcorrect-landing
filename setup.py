"""Setup configuration for AgentCorrect."""

from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="agentcorrect",
    version="1.0.0",
    author="AgentCorrect Team",
    description="Stop AI agents from double-charging customers and destroying databases",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/ishaan1345/agentcorrect",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "Topic :: Software Development :: Quality Assurance",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
    python_requires=">=3.8",
    install_requires=[],
    entry_points={
        "console_scripts": [
            "agentcorrect=agentcorrect.cli:main",
        ],
    },
    include_package_data=True,
)