
#include <vector>
#include <cassert>
#include <QVector>
#include <stdexcept>

#include "OpenGLFunctions.h"

#include "Terrain.h"


Terrain::Terrain(
	unsigned short size
,	OpenGLFunctions & gl)
: m_vertices(QOpenGLBuffer::VertexBuffer)
, m_indices(QOpenGLBuffer::IndexBuffer)
{
	m_vao.create();
	m_vao.bind();

	m_vertices.create();
	m_vertices.setUsagePattern(QOpenGLBuffer::StaticDraw);

	m_indices.create();
	m_indices.setUsagePattern(QOpenGLBuffer::StaticDraw);

    // Task_1_1 - ToDo Begin

    strip(size, m_vertices, m_indices, -1);

    // Configure your Vertex Attribute Pointer based on your vertex buffer (mainly number of coefficients ;)).

    gl.glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, sizeof(float)* 3, nullptr);
    gl.glEnableVertexAttribArray(0);

    // Task_1_1 - ToDo End

    m_vao.release();
}

void Terrain::draw(
    OpenGLFunctions & gl
,	const GLenum mode)
{
    // Task_1_1 - ToDo Begin

    // Setup the OpenGL state appropriate to the given and your personal drawing requirements.
    // You might take depth tests, primitive restart, and culling into account.

    // gl.glEnable(...
    // ...


	gl.glEnable(GL_DEPTH_TEST);
	gl.glEnable(GL_PRIMITIVE_RESTART);
	gl.glPrimitiveRestartIndex(-1);															//auf culling-Einstellungen wurde extra verzichtet, damit die Orientierung der Polygone unwichtig ist

    m_vao.bind();
	gl.glDrawElements(mode, m_indices.size() / sizeof(uint), GL_UNSIGNED_INT, nullptr);
    m_vao.release();

    // Remember to "clean up" the state after rendering.

    // gl.glDisable(...
    // ...

	gl.glDisable(GL_DEPTH_TEST);
	gl.glDisable(GL_PRIMITIVE_RESTART);

    // Task_1_1 - ToDo End
}

void Terrain::strip(
    const unsigned short size
,	QOpenGLBuffer & vertices
,	QOpenGLBuffer & indices
,	const GLuint primitiveRestartIndex)
{
    // Task_1_1 - ToDo Begin

    // perhaps, check for pointless parameter input

	if (size == 0){																			// ich habe mich entschieden auf eine sinnvolle Größe zu testen und nicht, ob vertices und indices existieren, bin mir allerdings nicht sicher was von beiden gemeint war
		throw std::invalid_argument("size argument is 0.");
		exit(EXIT_FAILURE);
	}

    // tips: probably use some for loops to fill up a std or qt container with 
    // floats or other structs, fitting the purpose. further, remember that 
    // gradually summing up lots of small floats might lead to major inaccuracies ...

    // ...

	QVector<float> vertexVec;
	QVector<uint> indexVec;

	for (float j = 0.0f; j < size; j++){													// erstellen eines regulären Gitters
		for (float i = 0.0f; i < size; i++){
			vertexVec.append(i / size);
			vertexVec.append(0.0f);
			vertexVec.append(j / size);
		}
	}

	vertices.bind();
	vertices.allocate(vertexVec.constData(), vertexVec.size() * sizeof(float));
	
	// ...

	for (int t = 0; t < size -1; t++){														// die Gitterpunkte müssen sinnvoll indiziert werden, sodass der Modus TRIANGLE_STRIP funktioniert
		for (int u = 0; u < size; u++){
			indexVec.append(u + size * t);
			indexVec.append(u + size + size * t);
		}
		indexVec.append(primitiveRestartIndex);
	}

	indices.bind();
	indices.allocate(indexVec.constData(), indexVec.size() * sizeof(uint));

    // Task_1_1 - ToDo End
}
