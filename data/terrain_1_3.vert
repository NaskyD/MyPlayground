#version 150

// Task_1_3 - ToDo Begin

uniform mat4 transform;
uniform sampler2D height;

in vec3 a_vertex;

out float vert_height;
out vec2 tex_coords;
out vec3 normal;

void main()
{
	// Note: should be similar to 1_2 vertex shader.
	// In addition, you need to pass the texture coords 
	// to the fragment shader...

	// ...
	
	tex_coords = a_vertex.xz;
	vert_height = texture(height, a_vertex.xz).x;
	float neighbor1, neighbor2;
	
	neighbor1 = texture(height, vec2(tex_coords.x + 1.0/256, tex_coords.y)).x;								//die Höhe des "rechten" Nachbarvertex
	neighbor2 = texture(height, vec2(tex_coords.x,           tex_coords.y + 1.0/256)).x;					//die Höhe des "südlich" liegenden Nachbarvertex
	
	normal = normalize(cross((vec3(1.0/256, neighbor1 - vert_height, 0.0)), vec3(0.0, neighbor2 - vert_height, 1.0/256)));		//Kreuzprodukt beider Richtungsvektoren zu den Nachbarvertices

	gl_Position = transform * vec4(a_vertex.x, vert_height, a_vertex.z, 1.0);
	
	// Task_1_3 - ToDo End
}
